import { ISelectors } from "../../store";

export const newUserSelectors = {
    image: state => state.newUser.image
} as ISelectors