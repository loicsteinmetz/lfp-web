import {GetServerSideProps} from 'next';
import {s} from '../../utils/serializer';
import Layout from '../../components/templates/Layout';
import ArticleContent from '../../components/molecules/ArticleContent';
import {getGeneral} from '../../data/general.data';
import {getPages} from '../../data/pages.data';
import {getCategories} from '../../data/categories.data';
import {getTypes} from '../../data/types.data';
import {findArticleBySlug} from '../../data/articles.data';

interface ArticleProps {
  general: General;
  pages: Page[];
  categories: Category[];
  types: Type[];
  article: Article;
}

export default function Article({general, pages, categories, types, article}: ArticleProps) {
  return (
    <Layout pages={pages} categories={categories} types={types} general={general} title={article.title}>
      <ArticleContent article={article}/>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps<ArticleProps, {slug: string}> = async (context) => {
  const general = s(await getGeneral('*'));
  const pages = s((await getPages()).data);
  const categories = s((await getCategories()).data);
  const types = s((await getTypes()).data);
  const article = s((await findArticleBySlug(context.params!.slug, '*')))
  return {props: {general, pages, categories, types, article}}
}
