import Link from 'next/link';
import { IProduct } from '@/models';

interface IProps {
  product: IProduct;
}

const Breadcrumbs = ({ product }: IProps) => {
  return (
    <p className="text-xs">
      <Link className="hover:underline cursor-pointer" href="/">
        <span>Inicio</span>
      </Link>
      <span> / </span>
      <Link
        className="hover:underline cursor-pointer"
        href={`/categorias/${product.category?.slug}`}
      >
        {product.category?.name}
      </Link>
      {` / ${product.title}`}
    </p>
  );
};

export default Breadcrumbs;
