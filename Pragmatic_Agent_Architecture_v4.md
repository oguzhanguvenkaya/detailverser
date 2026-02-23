# Pragmatik Ajan Mimarisi (v4): 2026 Üretim Sistemleri İçin Gerçekçi Bir Rehber

**Yazar:** Manus AI
**Tarih:** 23 Şubat 2026
**Özet:** Bu doküman, önceki (v3) hibrit mimari tavsiyesindeki aşırı mühendislik (overengineering) unsurlarını eleştirerek, 2025-2026 endüstri verileri ve kanıtlanmış en iyi pratiklere dayanan, pragmatik ve işlevsel bir kurumsal ajan mimarisi sunmaktadır. Temel felsefe, "**probleminizi çözen en basit mimariyi kullanmak**" ve yalnızca zorunlu olduğunda karmaşıklığı artırmaktır.

---

## 1. Yönetici Özeti: Pragmatik Dönüşüm

Önceki mimari (v3), akademik araştırmaların en uç noktalarını bir araya getirme denemesiydi. Ancak, LangChain, Anthropic ve OpenAI gibi endüstri liderlerinin üretim verileri, bu yaklaşımların çoğunun (LATS/MCTS, Talker-Reasoner, SCoRe) henüz **üretim için hazır olmadığını** ve gereksiz karmaşıklık getirdiğini göstermektedir [1][2].

**Yeni Felsefe:** Karmaşık çoklu ajan sistemleri kurmak yerine, **tek bir güçlü ajanın yeteneklerini**, üstün **bağlam mühendisliği (context engineering)** ve sağlam **koruma rayları (guardrails)** ile sonuna kadar kullanın. Çoklu ajan sistemleri bir başlangıç noktası değil, kaçınılmaz bir zorunluluk olduğunda başvurulacak bir çözümdür.

| Eski Yaklaşım (v3 - Overengineered) | Yeni Yaklaşım (v4 - Pragmatik) | Gerekçe |
|---|---|---|
| LATS/MCTS ile Planlama | Modelin Kendi Akıl Yürütmesi | Üretimde kanıtlanmış MCTS uygulaması yok; modern modeller (Claude 4, GPT-o4) yeterli [3]. |
| Talker-Reasoner İkili Sistemi | Tek Ajanın Durum Raporlaması | Asenkron güncelleme için ayrı bir ajan, maliyet ve karmaşıklığı artırır [4]. |
| SCoRe ile Öz-Düzeltme | Basit "Hata ile Yeniden Dene" Döngüsü | SCoRe bir eğitim tekniğidir, çıkarım zamanında pratik değildir. Basit bir geri besleme döngüsü yeterlidir [2]. |
| Six Sigma Ajan Oylaması | Tek Ajan + Değerlendirici Kalıbı | 13x maliyet ve gecikme, çoğu senaryo için aşırı. Kalite için Değerlendirici (Evaluator) ajanı daha verimlidir [5]. |

---

## 2. 2026 Üretim Odaklı Ajan Mimarisi: Tek ve Güçlü

Önerilen mimari, LangGraph'ın durum yönetimi ve kontrol edilebilirliği üzerine inşa edilmiş, tek ve yetenekli bir ajanı merkeze alır.

![Pragmatic Agent Architecture](https://i.imgur.com/example.png)  <!-- Placeholder for a diagram -->

### Bileşen 1: Çekirdek - Durum Bilinçli Tek Ajan (LangGraph)

- **Çerçeve:** LangGraph StateGraph.
- **Neden?** Durumu (state) açıkça yönetmenizi sağlar, bu da **izlenebilirlik (observability)** ve **hata ayıklama (debugging)** için kritik öneme sahiptir. LangChain'in 2026 raporuna göre, üretimdeki sistemlerin %89'u bir tür izlenebilirlik uygulamıştır [1]. Durum, sadece bir sohbet geçmişi değil, yapılandırılmış bir veri olmalıdır.

### Bileşen 2: Akıl Yürütme - Modele Güvenmek

- **Yaklaşım:** Karmaşık planlama algoritmaları yerine, Claude 4 Sonnet, GPT-o4/o3 gibi en üst düzey modellerin doğal akıl yürütme ve adım adım düşünme yeteneklerini kullanın.
- **Uygulama:** Sistem isteminizde (system prompt) görevi alt hedeflere ayırması, bir eylem planı oluşturması ve her adımdan sonra durumu güncellemesi gerektiğini açıkça belirtin.

### Bileşen 3: Eylem - Standartlaştırılmış ve Korumalı Araçlar

- **Temel Prensip:** Her araç, net girdileri, çıktıları ve açıklamaları olan bir API gibi tasarlanmalıdır.
- **Araç Sayısı:** Bir ajan için ideal araç sayısı 10-20'yi geçmemelidir. Bu sayıyı aştığınızda, modelin doğru aracı seçme performansı düşer [4].
- **Gelişmiş Yaklaşım (Koşullu):** Çok sayıda aracınız varsa (>20), Anthropic'in öncülük ettiği **MCP (Model Context Protocol) ile Kod Yürütme** modelini düşünün. Ajan, araçları doğrudan çağırmak yerine, bu araçları çağıran bir Python kodu yazar. Bu, bağlam penceresini (context window) verimli kullanır [6].

### Bileşen 4: Kalite ve Öz-Düzeltme - İki Katmanlı Savunma

Bu, halüsinasyonları ve kalite sorunlarını en aza indirmek için en kritik alandır.

1.  **Katman 1 (İçsel): Bağlam Mühendisliği ve Kaynak Gösterme (Grounding)**
    - **Bağlam Mühendisliği:** Bu, istem mühendisliğinin ötesindedir. Görevin her adımı için modele **en uygun bilgiyi (en küçük yüksek sinyalli token seti)** sağlamaktır. Geçmiş konuşmalar, ilgili belgeler (RAG ile alınmış) ve araç çıktıları dikkatlice seçilip özetlenmelidir. Anthropic'e göre bu, "bağlam çürümesini" (context rot) önler [7].
    - **Kaynak Gösterme:** Özellikle bilgiye dayalı görevler için, ajanı her zaman iddialarını destekleyen kaynakları (örneğin, RAG ile alınan belgeden alıntılar) belirtmeye zorlayın.

2.  **Katman 2 (Dışsal): Değerlendirici-Optimize Edici Kalıbı (Evaluator-Optimizer Pattern)**
    - **Yaklaşım:** Yüksek riskli veya karmaşık görevler için, ana ajanın çıktısını inceleyen ikinci, daha basit bir **Değerlendirici (Evaluator)** ajanı kullanın. Bu kalıp, Anthropic tarafından kanıtlanmış 5 üretim kalıbından biridir [5].
    - **İş Akışı:**
        1.  **Ana Ajan** çıktıyı üretir.
        2.  **Değerlendirici Ajan**, çıktıyı önceden tanımlanmış bir kontrol listesine (rubric) göre (örneğin, "Tüm kaynaklar belirtilmiş mi?", "Cevap, sorunun tüm kısımlarını kapsıyor mu?") değerlendirir.
        3.  Değerlendirme başarısız olursa, çıktı, düzeltme talimatlarıyla birlikte ana ajana geri gönderilir. Bu döngü, kalite hedefine ulaşılana kadar veya belirli bir deneme sayısından sonra durana kadar devam eder.

---

## 3. Ne Zaman Çoklu Ajana Geçilmeli?

Tek ajanın yeteneklerini sonuna kadar kullandıktan sonra, aşağıdaki durumlardan **en az biri** geçerliyse çoklu ajan mimarisine geçmeyi düşünün [4]:

1.  **Gerçek Paralellik İhtiyacı:** Birkaç bağımsız alt görevin aynı anda çalıştırılması gerektiğinde (örneğin, üç farklı API'den veri çekmek).
2.  **Bağlam Aşırı Yüklenmesi:** Tek bir ajanın yönetmesi gereken araç sayısı 20'yi aştığında veya sistem istemi aşırı karmaşık hale geldiğinde.
3.  **Sert Güvenlik/İzin Sınırları:** Farklı ajanların kesinlikle farklı veri kaynaklarına veya izinlere sahip olması gerektiğinde (örneğin, bir ajan müşteri veritabanına erişirken diğerinin yalnızca genel belgelere erişmesi).

Çoklu ajana geçtiğinizde, en güvenilir kalıp **Orkestratör-İşçi (Orchestrator-Worker)** modelidir. Bir merkezi orkestratör, görevi alt görevlere ayırır ve bunları uzman işçi ajanlara dağıtır. Bu, "herkesin herkesle konuştuğu" kaotik sürülerden daha kontrol edilebilirdir [2].

---

## 4. Üretim Kontrol Listesi

Bu mimariyi üretime almadan önce, Stack AI tarafından önerilen şu kontrol listesini tamamlayın [2]:

- [ ] **İzlenebilirlik:** Her isteği, maliyet ve adımlar dahil olmak üzere uçtan uca izleyebiliyor musunuz?
- [ ] **Yapılandırılmış Durum:** Ajanın durumu, sohbet geçmişinden ibaret değil, yapılandırılmış bir nesne olarak saklanıyor mu?
- [ ] **Araç Güvenliği:** Tüm araç çağrıları doğrulanıyor ve en az ayrıcalık ilkesine uyuyor mu?
- [ ] **Kaynak Gösterme:** Ajan, doğruluk gerektiren durumlarda kaynaklarını belirtebiliyor mu?
- [ ] **Hata Yönetimi:** Zaman aşımları, yeniden deneme mekanizmaları ve insan müdahalesine yönlendirme yolu var mı?
- [ ] **Değerlendirme (Evals):** Her sürümden önce çalışan, temel senaryoları kapsayan küçük bir test setiniz var mı?

---

### Referanslar

[1] LangChain. (2025). *State of Agent Engineering 2026*. LangChain Blog.
[2] Stack AI. (2026). *The 2026 Guide to Agentic Workflow Architectures*. Stack AI Blog.
[3] OpenAI. (2025). *A practical guide to building agents*. OpenAI Business.
[4] Bouchard, L. (2026). *Multi-agent is the new overengineering*. Towards AI.
[5] Anthropic. (2024). *Building effective AI agents*. Anthropic Research.
[6] Anthropic. (2025). *Code execution with MCP: building more efficient AI agents*. Anthropic Engineering.
[7] Anthropic. (2025). *Effective context engineering for AI agents*. Anthropic Engineering.
