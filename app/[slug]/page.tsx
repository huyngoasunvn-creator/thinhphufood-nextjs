import { notFound, redirect } from "next/navigation";
import connectDB from "@/lib/connectDB";
import { adminDb } from "@/lib/firebase-admin";
import EventEmbed from "@/models/EventEmbed";
import EmbeddedPage from "@/models/EmbeddedPage";
import { getMenus } from "@/lib/server/menu-server";

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function Page({ params }: PageProps) {
  const slug = params.slug;
  const menus = await getMenus();
  const currentMenu = menus.find((menu) => menu.slug === slug);

  if (currentMenu) {
    const parentMenu = currentMenu.parentId
      ? menus.find((menu) => menu.id === currentMenu.parentId)
      : null;

    if (currentMenu.slug === "san-pham") {
      redirect("/san-pham");
    }

    if (parentMenu?.slug === "san-pham") {
      redirect(`/san-pham?category=${currentMenu.id}`);
    }

    redirect(`/danh-muc/${slug}`);
  }

  const menuSnapshot = await adminDb
    .collection("menus")
    .where("slug", "==", slug)
    .limit(1)
    .get();

  if (!menuSnapshot.empty) {
    const menu = menuSnapshot.docs[0];
    const parentId = menu.data().parentId as string | null | undefined;

    if (parentId) {
      redirect(`/san-pham?category=${menu.id}`);
    }

    redirect(`/danh-muc/${slug}`);
  }

  await connectDB();

  const page = await EmbeddedPage.findOne({
    slug,
    isActive: true,
  });

  const event = await EventEmbed.findOne({
    slug,
    isActive: true,
  });

  if (event) {
    return (
      <div className="w-full h-screen">
        <iframe
          src={event.externalUrl}
          className="w-full h-full border-0"
        />
      </div>
    );
  }

  if (!page) return notFound();

  return (
    <div>
      <h1>{page.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.content }} />
    </div>
  );
}
