import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import SideBarItem from "./SideBarItem";

function SideBar() {
  return (
    <aside className="pt-12 bg-sidebar h-screen font-vazir w-64">
      <Accordion type="multiple" className="p-8 flex flex-col gap-6">
        <AccordionItem value="item-1">
          <AccordionTrigger className="flex gap-3 w-32 cursor-pointer">
            <span className="material-symbols-outlined text-muted-foreground">
              groups
            </span>
            <h4 className="text-xl text-secondary-foreground">کارفرما</h4>
          </AccordionTrigger>
          <AccordionContent>
            <ul className="flex flex-col gap-3 py-2">
              <SideBarItem link="/employers" text="لیست کارفرما" />
              <SideBarItem link="/employer-details" text="جزئیات کارفرما" />
              <SideBarItem
                link="/employer-advertises"
                text="لیست آگهی کارفرما"
              />
              <SideBarItem
                link="/employer-requests"
                text="لیست درخواست های کارفرما"
              />
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="flex gap-3 w-32 cursor-pointer">
            <span className="material-symbols-outlined text-muted-foreground">
              person
            </span>
            <h4 className="text-xl text-secondary-foreground">کارجو</h4>
          </AccordionTrigger>
          <AccordionContent>
            <ul className="flex flex-col gap-3 py-2">
              <SideBarItem link="/jobseekers" text="لیست کارجو" />
              <SideBarItem link="/jobseeker-details" text="جزئیات کارجو" />
              <SideBarItem
                link="/jobseeker-advertises"
                text="لیست آگهی کارجو"
              />
              <SideBarItem link="/jobseeker-requests" text="لیست درخواست های" />
              <SideBarItem
                link="/jobseeker-resumes"
                text="لیست رزومه های کارجو"
              />
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
}

export default SideBar;
