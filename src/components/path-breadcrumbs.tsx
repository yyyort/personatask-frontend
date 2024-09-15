"use client";
import React from "react";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { Slash } from "lucide-react";
import Link from "next/link";

const pathList = (path: string) => {
  const pathArray = path.split("/");

  //remove the first element

  // replace the first element with 'Home'
  pathArray[0] = "Home";

  return pathArray;
};

export default function PathBreadcrumbs() {
  const pathname = usePathname();

  const paths: string[] = pathList(pathname);

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          {paths.map((path, index) => (
            <div className="flex gap-2 items-end text-[1rem]" key={index}>
              <BreadcrumbItem key={index}>
                <Link
                  href={index === 0 ? "/" : `/${path}`}
                  className="hover:text-black ease-in-out duration-200"
                >
                  { 
                    path.length > 0 ? path : ""
                  }
                </Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                {
                    index < paths.length - 1 ? <Slash /> : ""
                }
              </BreadcrumbSeparator>
            </div>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </>
  );
}
