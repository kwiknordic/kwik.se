export type Stage = 'raw' | 'staged' | 'curated'
export type Ext = 'opml' | 'json'

export type StoragePathSettings = {
  stage: Stage
  ext: Ext
  date?: Date
  source: 'overcast' | 'instapaper' | 'movielens'
}
