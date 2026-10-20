import { PageShell } from "@/components/site";

export const metadata = {
  title: "簡介",
  description: "潘朗希弟兄的簡要生平與寫作簡介。",
};

export default function ChineseBiographyPage() {
  return (
    <PageShell chinese>
      <main lang="zh-Hant-HK" className="subpage page-width">
        <p className="eyebrow">關於我</p>
        <br />
        <article className="article-body biography-copy">
          <p>
            潘朗希弟兄，字諾仁，聖名瑪利亞濟利祿，殉道者聖猶斯定在俗會成員，祖籍廣東東莞，農曆癸未歲次五月十五日、公曆天主降生二千零三年六月十四日生於香港，現居英國羅福郡沃辛漢。
          </p>
          <p>
            潘弟兄從小對傳統公教禮儀、教會歷史、聖堂建築都均有涉獵，除了博覽群書外，對傳統公教禮儀書籍更詳加分析，並作深入鑽研，後更機緣巧邀請在隆重大禮彌撒內擔任禮節司。近年來更致力於推廣傳統公教禮儀，並把多年來儲積的經驗和心得，公諸於世，以對傳統公教禮儀作出貢獻。
          </p>
          <p>
            空餘時喜愛寫作，以文會友，文章主題大多數環繞著潘弟兄個人生活中的一點一滴、公教禮儀知識、以及潘弟兄對於一些事情的個人想法和感受。
          </p>
        </article>
      </main>
    </PageShell>
  );
}
