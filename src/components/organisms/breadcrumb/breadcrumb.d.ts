export type BreadCrumbProps = React.ComponentPropsWithoutRef<"nav"> & {
  separator?: React.ReactNode;
};

export interface BreadCrumbItem {
  name: string;
  path?: string;
  sub?: BreadCrumbItem[];
}
