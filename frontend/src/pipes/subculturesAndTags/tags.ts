import { ITag } from '../../types/tags';
export const tagsPipes = {
    names: (tags: Array<ITag>) => tags.map((tag) => tag.name)
}