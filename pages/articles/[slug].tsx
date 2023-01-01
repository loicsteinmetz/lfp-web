import {GetServerSideProps} from 'next';
import {s} from '../../utils/serializer';
import {getArticleBySlug, findRelatedArticles} from '../../data/articles.data';
import Layout from '../../components/Layout';
import {getAuthor} from '../../data/authors.data';
import Article from '../../components/Article';
import {provideData} from '../../utils/requests';
import {BaseProps} from '../index';

interface ArticleProps extends BaseProps {
  article: Article;
  authors: Author[];
  relatedArticles: Article[];
}

export default function ArticlePage({url, general, pages, categories, types, article, authors, relatedArticles}: ArticleProps) {
  return (
    <Layout
      url={url}
      pages={pages}
      keywords={article.keywords}
      categories={categories}
      types={types}
      general={general}
      title={article.title}
      description={article.extract}
      cover={article.cover ?? undefined}
    >
      <Article article={article} authors={authors} relatedArticles={relatedArticles}/>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps<ArticleProps, { slug: string }> = async (context) => {
  return await provideData(
    context,
    async () => {
      const article = s((await getArticleBySlug(context.params!.slug, '*')));
      const authors = await Promise.all(article.authors?.map(async (a: any) => s(((await getAuthor(a.id, '*'))))) ?? []);
      const relatedArticles = article.subjectsId ? s((await findRelatedArticles(article.subjectsId, article.id, '*'))) : [];
      return {article, authors, relatedArticles};
    }
  );
}
