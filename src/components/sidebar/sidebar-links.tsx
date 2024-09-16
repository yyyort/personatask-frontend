import { cn } from "@/lib/utils";
import { House, StickyNote, Repeat2, ListCheck } from "lucide-react";
import Link from "next/link";

type linkType = {
  name: string;
  href: string;
  icon: JSX.Element;
};

const links: linkType[] = [
  {
    name: "Home",
    href: "/",
    icon: <House />,
  },
  {
    name: "Tasks",
    href: "/tasks",
    icon: <ListCheck />,
  },
  {
    name: "Routine",
    href: "/routine",
    icon: <Repeat2 />,
  },
  {
    name: "Notes",
    href: "/notes",
    icon: <StickyNote />,
  },
];

export default function SidebarLinks({ isExpanded }: { isExpanded: boolean }) {
  return (
    <>
      {links.map((link: linkType, index: number) => (
        <Link href={link.href} className="flex gap-2" key={link.name}>
          {link.icon}
          <p className={cn("", isExpanded ? "" : "hidden")}>{link.name}</p>
        </Link>
      ))}
    </>
  );
}
