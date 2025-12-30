export interface LatestSearchReducerAction {
  type: 'append' | 'clear' | 'init'
  query?: string
  arrayOfQuery?: string[]
}

export interface LatestSearchContextType {
  latestSearch: string[]
  setLatestSearch: React.Dispatch<LatestSearchReducerAction>
};
