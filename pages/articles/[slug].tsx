import {GetServerSideProps} from 'next';
import {s} from '../../utils/serializer';
import {getGeneral} from '../../data/general.data';
import {getPages} from '../../data/pages.data';
import {getCategories} from '../../data/categories.data';
import {getTypes} from '../../data/types.data';
import {findArticleBySlug} from '../../data/articles.data';
import Layout from '../../components/Layout';
import {getAuthor} from '../../data/authors.data';
import Article from '../../components/Article';

interface ArticleProps {
  general: General;
  pages: Page[];
  categories: Category[];
  types: Type[];
  article: Article;
  authors: Author[];
}

export default function ArticlePage({general, pages, categories, types, article, authors}: ArticleProps) {
  return (
    <Layout pages={pages} categories={categories} types={types} general={general} title={article.title}>
      <Article article={article} authors={authors}/>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps<ArticleProps, {slug: string}> = async (context) => {
  const general = s(await getGeneral('*'));
  const pages = s((await getPages()).data);
  const categories = s((await getCategories()).data);
  const types = s((await getTypes()).data);
  const article = s((await findArticleBySlug(context.params!.slug, '*')));
  const authors = await Promise.all(article.authors.map(async (a: any) => s(((await getAuthor(a.id, '*'))))));
  return {props: {general, pages, categories, types, article, authors}}
}
