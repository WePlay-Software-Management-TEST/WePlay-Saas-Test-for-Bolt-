import { type Params } from 'react-router-dom';
export interface LinkMatch {
  path: string
  name: string
}

export interface BreadCrumbsProps {
  links: LinkMatch[]
}

export interface CustomUseMataches {
  id: string
  pathname: string
  params: Params<string>
  data: unknown
  handle: {
    crumbs?: (() => JSX.Element) | ((id?: string, routeName?: string) => JSX.Element)
    headerText?: string
  }
};
