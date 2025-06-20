import { HydratedDocument, Model } from "mongoose"
import { ErrorWithStatus } from "../../common/middlewares/errorHandlerMiddleware"
import { UserI, userModel } from "../../modules/users/users.model"
import { friendRequestModel } from "../../modules/friends/friends.model"


export async function findUserUtil(filter: object): Promise<HydratedDocument<UserI>> {
    const user: HydratedDocument<UserI> | null = await userModel.findOne(filter).exec()
    if (!user) throw new ErrorWithStatus(404, "User was not found")
    return user
}

export async function findFriendRequestUtil(filter: object) {
    const request = await friendRequestModel.findOne(filter).exec()
    if (!request) throw new ErrorWithStatus(404, "Friend request was not found")
    return request
}
