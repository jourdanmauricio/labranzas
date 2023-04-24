import { useContext, useEffect, useState } from 'react';
import FavoriteItem from '@/components/Favorites/FavoriteItem';
import { ICategory, IProduct } from '@/models';
import MainLayout from '@/layout/MainLayout';
import AppBar from '@/components/AppBar/AppBar';
import FavoritesContext from '@/context/FavoritesContext';
import SearchFilterOrder from '@/components/elements/SearchFilterOrder';

const CategoryService = require('@/db/services/category.service');
const service = new CategoryService();

interface IProps {
  categories: ICategory[];
}

const Favoritos = ({ categories }: IProps) => {
  const [_favorites, _setFavorites] = useState([]);
  const { favorites } = useContext(FavoritesContext);
  const [searchText, setSearchText] = useState('');
  const [order, setOrder] = useState('Ordenar por');

  useEffect(() => {
    _setFavorites(favorites);
  }, [favorites]);

  const filterFav: IProduct[] = _favorites.filter(
    (item: IProduct) =>
      item.title.toLowerCase().includes(searchText.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchText.toLowerCase())
  );

  const oderFav = () => {
    if (order === 'INITIAL') return filterFav;
    if (order === 'MIN-VALUE')
      return filterFav.sort((a, b) => +a.price - +b.price);
    if (order === 'MAX-VALUE')
      return filterFav.sort((a, b) => +b.price - +a.price);
    if (order === 'FEATURED')
      return filterFav.sort((a, b) => +b.sold_quantity - +a.sold_quantity);
    return filterFav;
  };

  return (
    <>
      <MainLayout>
        <AppBar categories={categories} />

        <h1 className="pt-10 text-3xl text-gray-800 text-center">Favoritos</h1>

        <section className="p-4 sm:p-10">
          <SearchFilterOrder
            searchText={searchText}
            setSearchText={setSearchText}
            order={order}
            setOrder={setOrder}
            total={_favorites.length}
            partial={filterFav.length}
            feature="Favoritos"
          />
          <article className="">
            {oderFav().length > 0 && (
              <ul>
                {oderFav().map((item) => (
                  <FavoriteItem key={item.id} item={item} />
                ))}
              </ul>
            )}
          </article>
        </section>
      </MainLayout>
    </>
  );
};

export default Favoritos;

export async function getStaticProps() {
  try {
    // Categories
    const responseCategories = await service.find();
    const respCategories = responseCategories.map((cat: any) => cat.dataValues);
    const categories = respCategories.filter(
      (cat: ICategory) => cat.productsCount > 0
    );

    return {
      props: {
        categories,
      },
    };
  } catch (error) {
    console.log('ERROR', error);
  }
}
