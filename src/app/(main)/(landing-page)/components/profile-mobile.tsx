import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useModal from "@/hooks/use-modal";
import ProfileDialog from "./dialog/profile-dialog";

type Props = {
  image: string;
  username: string;
};

export default function ProfileMobile({ image, username }: Props) {
  const { isOpen, openModal, setIsOpen } = useModal(false);

  return (
    <>
      <button onClick={openModal}>
        <Avatar className="w-12 h-12">
          <AvatarImage src={image} alt={username} />
          <AvatarFallback>{username.charAt(0)}</AvatarFallback>
        </Avatar>
      </button>

      {isOpen && <ProfileDialog isOpen={isOpen} setIsOpen={setIsOpen} />}
    </>
  );
}
