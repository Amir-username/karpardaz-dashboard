import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";

function SideBar() {
  return (
    <aside className="pt-12 bg-sidebar h-screen font-vazir">
      <Accordion type="multiple" className="p-8 flex flex-col gap-6">
        <AccordionItem value="item-1">
          <AccordionTrigger className="flex gap-3 w-32 cursor-pointer">
            <span className="material-symbols-outlined text-muted-foreground">groups</span>
            <h4 className="text-xl text-secondary-foreground">کارفرما</h4>
          </AccordionTrigger>
          <AccordionContent>
            <ul className="flex flex-col gap-3 py-2">
              <li className="text-muted-foreground cursor-pointer hover:text-foreground duration-200">
                لیست کارفرما
              </li>
              <li className="text-muted-foreground cursor-pointer hover:text-foreground duration-200">
                جزئیات کارفرما
              </li>
              <li className="text-muted-foreground cursor-pointer hover:text-foreground duration-200">
                لیست آگهی کارفا
              </li>
              <li className="text-muted-foreground cursor-pointer hover:text-foreground duration-200">
                لیست درخواست های کارفرما
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="flex gap-3 w-32 cursor-pointer">
            <span className="material-symbols-outlined text-muted-foreground">person</span>
            <h4 className="text-xl text-secondary-foreground">کارجو</h4>
          </AccordionTrigger>
          <AccordionContent>
            <ul className="flex flex-col gap-3 py-2">
              <li className="text-muted-foreground cursor-pointer hover:text-foreground duration-200">
                لیست کارجو
              </li>
              <li className="text-muted-foreground cursor-pointer hover:text-foreground duration-200">
                جزئیات کارجو
              </li>
              <li className="text-muted-foreground cursor-pointer hover:text-foreground duration-200">
                لیست آگهی کارجو
              </li>
              <li className="text-muted-foreground cursor-pointer hover:text-foreground duration-200">
                لیست درخواست های کارجو
              </li>
              <li className="text-muted-foreground cursor-pointer hover:text-foreground duration-200">
                لیست رزومه های کارجو
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
}

export default SideBar;
