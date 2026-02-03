import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useModal from "@/hooks/use-modal";
import ProfileDialog from "./dialog/profile-dialog";
import { Dialog } from "@radix-ui/react-dialog";

type Props = {
  image: string;
  username: string;
};

export default function ProfileMobile({ image, username }: Props) {
  const { isOpen, openModal, setIsOpen } = useModal(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <button onClick={openModal}>
        <Avatar className="w-12 h-12">
          <AvatarImage src={image} alt={username} />
          <AvatarFallback>{username.charAt(0)}</AvatarFallback>
        </Avatar>
      </button>

      <ProfileDialog />
    </Dialog>
  );
}
