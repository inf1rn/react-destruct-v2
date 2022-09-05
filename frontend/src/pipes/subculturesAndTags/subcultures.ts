import _ from 'lodash';
import { ITag } from './../../types/tags.d';
export const subculturesPipes = {
    names: (tags: Array<ITag>) => _.uniqBy(tags, (tag) => tag.subculture.id).map((tag) => tag.subculture.name)
}