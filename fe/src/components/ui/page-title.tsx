import { LucideIcon } from "lucide-react";

interface PageTitleProps {
  icon: LucideIcon;
  title: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ icon: Icon, title }) => {
  return (
    <div className="flex items-center justify-center mb-6">
      <Icon className="h-6 w-6 text-primary mr-2" />
      <h1 className="text-2xl font-bold">{title}</h1>
    </div>
  );
};

export default PageTitle;
