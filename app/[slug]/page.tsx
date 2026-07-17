import { notFound, redirect } from "next/navigation";
import connectDB from "@/lib/connectDB";
import EventEmbed from "@/models/EventEmbed";
import EmbeddedPage from "@/models/EmbeddedPage";
import { getMenus } from "@/lib/server/menu-server";
import { buildMenuMap, findSectionRoot } from "@/lib/menu-sections";

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
    const menuMap = buildMenuMap(menus);
    const sectionRoot = findSectionRoot(currentMenu, menuMap);

    if (currentMenu.slug === "san-pham") {
      redirect("/san-pham");
    }

    if (currentMenu.slug === "nong-san") {
      redirect("/nong-san");
    }

    if (sectionRoot && sectionRoot.id !== currentMenu.id) {
      if (sectionRoot.slug === "san-pham") {
        redirect(`/danh-muc/${currentMenu.slug}`);
      }

      redirect(`/${sectionRoot.slug}?category=${currentMenu.id}`);
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
