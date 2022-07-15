import { PostsUser } from "../context/Context";

type Props = {
  user: PostsUser;
  styles?: string;
};

const UserCard = ({ user, styles }: Props) => {
  return (
    <div
      className={`flex flex-col flex-shrink-0 text-sm border-r-2 pr-3 justify-between items-center gap-2 ${styles}`}
    >
      <h2 className="font-bold">{user.username}</h2>
      <img
        src={user.avatar}
        className="rounded-full w-[80px] h-[80px] md:w-[100px] md:h-[100px] lg:w-[120px] lg:h-[120px]"
        alt="avatar"
      />
      <p className="font-bold">Posts: {user.userPostsCount}</p>
    </div>
  );
};

export default UserCard;
