# Kurumsal Projeler İçin Hibrit Ajan Mimarisi: Üretim Seviyesinde Güvenilirlik ve Kontrol

**Yazar:** Manus AI
**Tarih:** 23 Şubat 2026
**Sürüm:** 3.0

## 1. Yönetici Özeti

Bu doküman, kurumsal düzeyde, halüsinasyon riskinin sıfıra yakın olması gereken yapay zeka ajan sistemleri için üretim seviyesinde güvenilirlik, kontrol ve ölçeklenebilirlik sağlayan hibrit bir mimari önermektedir. Önerilen mimari, **LangGraph**'ın durum makinesi kontrolü ile **DeepMind**'ın hiyerarşik ve ikili ajan modellerini, **Anthropic**'in değerlendirici-optimize edici döngüsünü, **Hugging Face/Google**'ın kod tabanlı eylem paradigmasını ve **Lyzr Research**'ün Six Sigma güvenilirlik ilkelerini bir araya getirmektedir.

Temel problem, tekil dil modellerinin (LLM) %99 gibi yüksek adım başı doğruluk oranlarına sahip olsalar dahi, çok adımlı iş akışlarında **bileşik hata (compound error)** nedeniyle uçtan uca güvenilirliklerinin dramatik şekilde düşmesidir [1]. Bu mimari, modelin kendisini mükemmelleştirmek yerine, sistemi oluşturan bileşenlerin ve süreçlerin hata toleranslı olacak şekilde tasarlanması gerektiği ilkesine dayanır.

## 2. Mimari Bileşenleri ve Tasarım Gerekçeleri

Önerilen hibrit mimari, 5 ana bileşenden oluşur. Her bileşen, en son akademik araştırmalar ve endüstri standartları göz önünde bulundurularak seçilmiştir.

### 2.1. Orkestratör Ajan (Hiyerarşik Koordinatör)

**Görevi:** Ana görevi, bir bağımlılık ağacı şeklinde atomik alt görevlere ayırmak, bu görevleri uygun uzman ajanlara atamak, sonuçları doğrulamak ve nihai çıktıyı sentezlemek.

**Tasarım Gerekçesi:**
- **Azure/Microsoft Orkestrasyon Kalıpları** [2], karmaşık görevlerin yönetimi için hiyerarşik bir yaklaşımın zorunlu olduğunu göstermektedir. Orkestratör, **"Devir (Handoff)"** ve **"Manyetik (Magentic)"** kalıplarını birleştirerek hem önceden tanımlanmış hem de dinamik olarak ortaya çıkan görevleri yönetir.
- **LangGraph'ın Denetçi (Supervisor) Kalıbı** [3], bu hiyerarşik yapıyı bir durum makinesi olarak modellemek için mükemmel bir temel sağlar. Orkestratör, grafın ana yönlendiricisi olarak görev yapar.

### 2.2. Uzman Ajanlar (İkili Sistem: Talker-Reasoner)

**Görevi:** Her uzmanlık alanı (örn: veri analizi, kod yazma, API entegrasyonu) için bir **Talker** ve bir **Reasoner** ajandan oluşan ikili birimler oluşturulur.

- **Reasoner Ajan (Sistem 2 Düşüncesi):** Görevin karmaşık analiz, planlama ve yürütme kısmını üstlenir. Yavaş ve müzakerecidir.
- **Talker Ajan (Sistem 1 Düşüncesi):** Reasoner çalışırken, orkestratöre veya kullanıcıya hızlı, sezgisel durum güncellemeleri ve ara sonuçlar sunar. Asenkron çalışır.

**Tasarım Gerekçesi:**
- **Google DeepMind'ın Talker-Reasoner Modeli** [4], insan beyninin Sistem 1 (hızlı, sezgisel) ve Sistem 2 (yavaş, analitik) düşünme biçimlerinden ilham alır. Bu ayrım, hem sistemin yanıt verebilirliğini artırır hem de karmaşık görevlerin arka planda kesintiye uğramadan yürütülmesini sağlar.
- Bu asenkron yapı, LangGraph'ın paralel yürütme yetenekleri ile doğal olarak uyumludur [3].

### 2.3. Akıl Yürütme ve Eylem Mekanizması

**Görevi:** Reasoner Ajan'ın bir görevi nasıl planlayacağını ve yürüteceğini tanımlar.

- **Planlama: LATS (Language Agent Tree Search)** [5]: Reasoner, en iyi eylem dizisini bulmak için Monte Carlo Ağaç Araması (MCTS) tabanlı bir planlama yapar. Bu, ReAct veya Tree of Thoughts'tan daha üstündür çünkü çevresel geri bildirimi ve öz-yansıtmayı da içerir.
- **Eylem: CodeAct (Yapılandırılmış Kod Eylemleri)** [6]: Araç çağırmak için JSON formatı yerine, doğrudan yürütülebilir Python kodu üretir. Hugging Face'in **smolagents** [7] kütüphanesindeki en son bulgulara göre, bu kod, `{"thoughts": "...", "code": "..."}` şeklinde yapılandırılmış bir JSON bloğu içinde üretilmelidir. Bu, hem kodun esnekliğini korur hem de ayrıştırma hatalarını %21 oranında azaltarak güvenilirliği artırır [7].

**Tasarım Gerekçesi:**
- LATS, olası gelecekleri simüle ederek ve en umut verici yolları seçerek, basit döngüsel yaklaşımlara göre çok daha sağlam bir karar verme süreci sunar.
- CodeAct, tek bir eylemde birden fazla aracı çağırma, döngüler ve koşullu mantık kullanma gibi yeteneklerle ajanların verimliliğini ve esnekliğini önemli ölçüde artırır. Yapılandırılmış çıktı, bu gücü üretim seviyesi güvenilirlikle birleştirir.

### 2.4. Öz-Düzeltme ve Kalite Kontrol Döngüleri

**Görevi:** Sistemin hem içsel olarak kendi hatalarını düzeltmesini hem de dışsal bir kalite kontrolünden geçmesini sağlamak.

- **İçsel Döngü: SCoRe (Self-Correction via Reinforcement Learning)** [8]: Her başarısız eylemden sonra, Reasoner Ajan, kendi hatasını analiz eder ve pekiştirmeli öğrenme ile eğitilmiş bir mekanizma aracılığıyla düzeltilmiş bir kod üretir. Bu, LangGraph'ta bir "düzeltme düğümü" olarak modellenir.
- **Dışsal Döngü: Evaluator-Optimizer Kalıbı** [9]: Bir uzman ajanın çıktısı, Orkestratör'e gönderilmeden önce ayrı bir **Değerlendirici Ajan** tarafından önceden tanımlanmış kalite ve güvenlik kriterlerine göre değerlendirilir. Çıktı yetersizse, somut geri bildirimle birlikte iyileştirilmesi için uzman ajana geri gönderilir.

**Tasarım Gerekçesi:**
- SCoRe, modelin dış bir doğrulayıcıya ihtiyaç duymadan kendi içsel bilgisini kullanarak hatalarını düzeltme yeteneğini kanıtlamıştır. Bu, "dağılım çöküşü" gibi sorunları önler.
- Anthropic tarafından popülerleştirilen Evaluator-Optimizer döngüsü, kurumsal standartlara ve iş kurallarına uyumu garanti altına almak için ek bir güvenlik katmanı sağlar.

### 2.5. Güvenilirlik ve Hata Toleransı (Six Sigma Yaklaşımı)

**Görevi:** Sistemin genel güvenilirliğini, tek bir modelin doğruluğunun çok ötesine taşımak.

- **Mikro-Ajan Örneklemesi ve Uzlaşı:** Her kritik ve atomik görev, farklı LLM'ler (veya aynı LLM'in farklı sıcaklık ayarları) kullanılarak `n` kez paralel olarak yürütülür. Çıktılar daha sonra kümelenir ve en çok oy alan kümenin sonucu (uzlaşı) doğru kabul edilir.

**Tasarım Gerekçesi:**
- **Six Sigma Agent makalesi** [1], bu yaklaşımın güvenilirliği üssel olarak artırdığını matematiksel olarak kanıtlamaktadır. Örneğin, %5 hata oranına sahip daha ucuz modellerle bile, 5 ajanlı bir uzlaşı mekanizması genel hata oranını %0.11'e düşürebilir. 13 ajan ile Six Sigma standardı olan milyonda 3.4 hata oranına ulaşılabilir.
- Bu, özellikle halüsinasyonun kabul edilemez olduğu finans, hukuk ve sağlık gibi sektörler için kritik bir güvencedir.

## 3. LangGraph Üzerinde Uygulama Mimarisi

Bu hibrit mimari, LangGraph'ın durum makinesi (StateGraph) ve yönlü döngüsel graf (DAG değil) yapısı üzerinde şu şekilde modellenebilir:

1.  **Graf Başlatma:** Kullanıcı isteği, Orkestratör Ajan'ın düğümüne yönlendirilir.
2.  **Orkestrasyon ve Yönlendirme:** Orkestratör, görevi alt görevlere ayırır ve bir bağımlılık ağacı oluşturur. Koşullu kenarlar (conditional edges) kullanarak ilk görevi ilgili Uzman Ajan alt-grafına yönlendirir.
3.  **Uzman Ajan Alt-Grafı:**
    *   **Reasoner Düğümü:** LATS ile bir plan oluşturur ve Yapılandırılmış CodeAct eylemi üretir.
    *   **Eylem Yürütme:** CodeAct kodu bir araç yorumlayıcısında çalıştırılır.
    *   **Koşullu Kenar (Başarı/Başarısızlık):**
        *   **Başarılıysa:** Çıktı, Değerlendirici Ajan düğümüne gider.
        *   **Başarısızsa:** Hata ve bağlam, **SCoRe Düzeltme Düğümüne** gider. Düzeltilmiş kod üretilir ve Eylem Yürütme adımına geri dönülür (belirli bir deneme sınırıyla).
    *   **Talker Düğümü:** Reasoner ve Eylem adımları sırasında paralel olarak çalışır ve Orkestratör'e durum güncellemeleri gönderir.
4.  **Değerlendirme Döngüsü:**
    *   **Değerlendirici Düğümü:** Uzman çıktısını analiz eder.
    *   **Koşullu Kenar (Geçti/Kaldı):**
        *   **Geçtiyse:** Çıktı, Orkestratör'e geri döner.
        *   **Kaldıysa:** Çıktı ve geri bildirim, bağlama eklenerek Uzman Ajan alt-grafının başlangıcına geri gönderilir.
5.  **Six Sigma Uzlaşı Katmanı (İsteğe Bağlı):** En kritik adımlar için, Orkestratör aynı görevi birden fazla Uzman Ajan alt-grafına (farklı modellerle) paralel olarak gönderebilir. Sonuçlar bir **Uzlaşı Düğümünde** toplanır ve oylanır.
6.  **Döngü ve Tamamlama:** Orkestratör, bağımlılık ağacındaki tüm görevler tamamlanana kadar yönlendirmeye devam eder. Sonunda, nihai yanıtı sentezler ve grafı sonlandırır.

LangGraph'ın yerleşik **kontrol noktası (checkpointing)** özelliği sayesinde, bu karmaşık döngünün herhangi bir adımında durum kalıcı olarak kaydedilebilir. Bu, hata durumunda maliyetli yeniden başlatmaları önler ve **insan-döngüde (human-in-the-loop)** onay veya müdahale süreçlerini mümkün kılar [3].

## 4. Sonuç

Önerilen bu hibrit mimari, tekil bir teknolojinin veya yaklaşımın sınırlamalarını aşarak, farklı araştırma alanlarının en güçlü yönlerini bir araya getirir. Model yeteneklerini artırmaya odaklanan geleneksel yaklaşımların aksine, bu mimari, **süreç ve sistem tasarımı yoluyla güvenilirlik mühendisliği** yapar. LangGraph'ın sağladığı esnek ve kontrol edilebilir çalışma zamanı üzerinde bu bileşenleri birleştirmek, kurumsal düzeyde güvenilir, ölçeklenebilir ve denetlenebilir otonom ajan sistemleri oluşturmak için sağlam ve geleceğe dönük bir temel sunmaktadır.

---

## Referanslar

[1]: Patel, K., Surendira, S., George, J., & Kapale, S. (2026). *The Six Sigma Agent: Achieving Enterprise-Grade Reliability in LLM Systems Through Consensus-Driven Decomposed Execution*. arXiv:2601.22290.

[2]: Microsoft Azure. (2025). *AI Agent orchestration patterns for enterprise applications*. Microsoft Learn.

[3]: Campos, N. (2025). *Building LangGraph: Designing an Agent Runtime from first principles*. LangChain Blog.

[4]: Google DeepMind. (2024). *Talker-Reasoner: A dual-system model for agile and robust agentic reasoning*. arXiv:2410.08328.

[5]: Zhou, A., et al. (2023). *Language Agent Tree Search Unifies Reasoning, Acting, and Planning in Language Models*. arXiv:2310.04406.

[6]: Wang, X., et al. (2024). *Executable Code Actions Elicit Better LLM Agents*. arXiv:2402.01030.

[7]: Reedi, A. J., & Roucher, A. (2025). *CodeAgents + Structure: A Better Way to Execute Actions*. Hugging Face Blog.

[8]: Google DeepMind. (2024). *Training Language Models to Self-Correct via Reinforcement Learning (SCoRe)*. arXiv:2409.12917.

[9]: Anthropic. (2024). *Evaluator-Optimizer Workflow*. Claude Cookbook.
