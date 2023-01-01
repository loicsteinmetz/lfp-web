import {s} from './serializer';
import {getGeneral} from '../data/general.data';
import {getPages} from '../data/pages.data';
import {getCategories} from '../data/categories.data';
import {getTypes} from '../data/types.data';
import {GetServerSidePropsContext} from 'next';
import {AxiosError} from 'axios';
import {UnwrapPromise} from 'next/dist/lib/coalesced-function';

export class NotFoundError extends Error {
}
export class ServerError extends Error {
}

async function getBase(context: GetServerSidePropsContext) {
  try {
    const url = context.req.headers.host + context.resolvedUrl;
    const general = s(await getGeneral('*'));
    const pages = s((await getPages()).data);
    const categories = s((await getCategories()).data);
    const types = s((await getTypes()).data);
    return {url, general, pages, categories, types};
  } catch (e) {
    if (e instanceof AxiosError && e.response?.status === 404) {
      throw new ServerError();
    }
    throw e;
  }
}

async function getContent<T>(cb: () => Promise<T>) {
  try {
    return await cb();
  } catch (e) {
    if ((e as any).response?.status === 404) {
      throw new NotFoundError();
    }
    throw e;
  }
}

export async function provideData<C>(context: GetServerSidePropsContext, content: () => Promise<C>):
  Promise<{props: C & UnwrapPromise<ReturnType<typeof getBase>>} | { notFound: true }>
{
  try {
    const baseRes = await getBase(context);
    const contentRes = await getContent(async () => {
      return await content();
    });
    return {props: {...baseRes, ...contentRes}};
  } catch (e) {
    if (e instanceof NotFoundError) {
      return {
        notFound: true,
      }
    } else {
      throw e;
    }
  }
}
