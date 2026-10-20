import Image from "next/image";
import { PageShell } from "@/components/site";
import { ContactForm } from "@/components/contact-form";

export const metadata = { title: "荒野中的呼喊者", description: "Ex umbris et imaginibus in veritatem" };

export default function ChineseHomePage() {
  return <PageShell chinese>
    <main lang="zh-Hant-HK" className="chinese-home">
      <section className="hero zh-hero page-width zh-home-hero">
        <div className="hero-copy"><p className="eyebrow">天主教媒體 · 寫作 · 禮儀服務</p><h1>歡迎你，<em>進入我的「心」。</em></h1><div className="zh-hero-intro"><p>在這裡，你或許會漸漸知道，我所愛的是甚麼、所念的是甚麼；也會看見，那些陪伴我一路走來的興趣、信念與片段。</p><p>我愛甚麼？</p><p>也許，是教會莊嚴的禮儀，是拉丁聖歌悠揚的餘韻，是古老教堂靜默的石牆，是歷史留下來的痕跡；也是一本書、一篇文字、一件值得細味的小事。</p><p>而我的「情」，又當安放於何處？</p><p>或許，就安放在我所珍愛的人、事、物之中；安放在文字裡，安放在記憶裡，也安放在那一位我所信靠的天主內。</p><p>這裡，是我的一方小天地。</p><p>願你在此，不只認識我的喜好，也能稍稍認識我的心。</p></div><div className="hero-actions"><a className="text-action" href="#about">認識我 <span>↓</span></a><a className="text-action" href="#work">探索我的工作 <span>↘</span></a></div></div>
        <div className="hero-portrait"><Image src="/assets/photos/chavez.jpg" alt="" width={640} height={760} priority /><span className="portrait-caption">Dixi, et salvavi animam meam!</span></div>
      </section>
      <section className="intro-band page-width" id="about"><p className="eyebrow">關於我</p><div><h2>以信仰與故事<br />連繫彼此。</h2><div className="prose"><p>我是一位羅馬天主教自由撰稿人及社交媒體內容創作者，現於 EWTN 英國分部擔任製作助理，參與拍攝、訪問及英國各地天主教活動的媒體報道。</p><p>我的工作與興趣包括神聖禮儀、羅馬天主教會的傳統與歷史、天主教新聞，以及數碼傳播。我亦有超過十年的禮儀服務經驗，並持續學習網站設計與開發。</p><div className="hero-actions"><a className="text-action" href="/zh-hk/biography/">簡介 <span>↗</span></a><a className="text-action" href="/resume/">查看英文履歷 <span>↗</span></a></div></div></div></section>
      <section className="featured-section page-width" id="work"><div className="section-top"><div><p className="eyebrow">工作範疇</p><h2>以故事連繫信仰</h2></div></div><div className="zh-work-grid"><article><span>01</span><h3>天主教媒體</h3><p>拍攝、訪問及活動報道</p></article><article><span>02</span><h3>寫作與傳播</h3><p>文章、社交媒體及數碼內容</p></article><article><span>03</span><h3>禮儀服務</h3><p>聖祭禮儀與教會傳統</p></article></div></section>
      <section className="writing-section page-width" id="writing"><div className="section-top"><div><p className="eyebrow">文章與分享</p><h2>文字記錄信仰旅程</h2></div><a className="text-action" href="/blog/">閱讀英文文章 <span>↗</span></a></div><p className="zh-note">繁體中文文章將陸續推出。</p></section>
      <section className="contact-section page-width" id="contact"><div className="contact-copy"><p className="eyebrow">保持聯絡</p><h2>期待與你<br />交流。</h2><p>歡迎就合作、寫作、天主教媒體、數碼內容、紀錄片製作及教會活動報道與我聯絡。</p></div><ContactForm chinese /></section>
      <p className="zh-note page-width">中文網站正在逐步完善，更多內容即將推出。</p>
    </main>
  </PageShell>;
}
