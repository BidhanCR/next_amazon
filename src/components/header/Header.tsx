import React, { useEffect, useState } from "react";
import logo from "../../images/logo.png";
import cartIcon from "../../images/cartIcon.png";
import Image from "next/image";
import { BiCaretDown } from "react-icons/bi";
import { HiOutlineSearch } from "react-icons/hi";
import { SlLocationPin } from "react-icons/sl";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { StateProps, StoreProduct } from "../../../type";
import { useSession, signIn, signOut } from "next-auth/react";
import { addUser } from "@/store/nextSlice";
import SearchProduct from "../SearchProduct";

const Header = () => {
  const { productData, favoriteData, userInfo, allProducts } = useSelector(
    (state: StateProps) => state.next
  );
  const { data: session } = useSession();
  const [allData, setAllData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    setAllData(allProducts.allProducts);
  }, [allProducts]);
  useEffect(() => {
    if (session) {
      dispatch(
        addUser({
          name: session?.user?.name,
          email: session?.user?.email,
          image: session?.user?.image,
        })
      );
    }
  }, [session, dispatch]);

  // search area

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  useEffect(() => {
    const filtered = allData.filter((item: StoreProduct) =>
      item.title.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, allData]);

  return (
    <div className="w-full h-20 bg-amazon_blue text-lightText sticky top-0 z-50">
      <div className="h-full w-full mx-auto inline-flex gap-1 mdl:gap-3 px-4 items-center justify-between">
        {/* logo */}
        <Link
          href={"/"}
          className="px-2 border border-transparent hover:border-white flex items-center h-[70%] justify-center duration-300 cursor-pointer"
        >
          <Image className="w-28 object-cover mt-1" src={logo} alt="logo" />
        </Link>
        {/* delivery */}
        <div className="px-2 border border-transparent hover:border-white gap-1 items-center h-[70%] justify-center duration-300 cursor-pointer hidden xl:inline-flex">
          <SlLocationPin />
          <div className="text-xs">
            <p>Delivery to</p>
            <p className="text-white font-bold">USA</p>
          </div>
        </div>
        {/* search bar */}
        <div className="flex-1 h-10 hidden md:inline-flex items-center justify-between relative">
          <input
            onChange={handleSearch}
            value={searchQuery}
            className="w-full h-full rounded-md px-2 placeholder:text-sm text-base text-black border-[3px] border-transparent outline-none focus-visible:border-amazon_yellow"
            type="text"
            placeholder="Search next_amazon products"
          />
          <span className="w-12 h-full bg-amazon_yellow text-black text-2xl flex justify-center items-center absolute right-0 rounded-tr-md rounded-br-md">
            <HiOutlineSearch />
          </span>
          {/* =======searchfield========= */}
          {searchQuery && (
            <div className="absolute top-12 left-0 w-full mx-auto max-h-96 bg-gray-200 rounded-lg overflow-y-scroll cursor-pointer text-black">
              {filteredProducts.length > 0 ? (
                <>
                  {searchQuery &&
                    filteredProducts.map((item: StoreProduct) => (
                      <Link
                      className="w-full border-b-[1px] border-b-gray-400 flex items-center gap-4"
                        href={{
                          pathname: `/${item._id}`,
                          query: {
                            _id: item._id,
                            brand: item.brand,
                            image: item.image,
                            title: item.title,
                            oldPrice: item.oldPrice,
                            price: item.price,
                            isNew: item.isNew,
                            category: item.category,
                            description: item.description,
                          },
                        }}
                        key={item._id}
                        onClick={()=> setSearchQuery("")}
                      >
                        <SearchProduct item={item} />
                      </Link>
                    ))}
                </>
              ) : (
                <div className="bg-white flex items-center justify-center py-10 rounded-lg shadow-lg">
                  <p className=" text-lg font-semibold animate-bounce">Nothing is matching with your search keyword. Please try again!</p>
                </div>
              )}
            </div>
          )}
          {/* =======searchfield========= */}
        </div>
        {/* sign in */}
        {userInfo ? (
          <div className="flex items-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%] gap-1">
            <Image
              src={userInfo.image}
              alt="userImage"
              height={32}
              width={32}
              className="rounded-full object-cover"
            />
            <div className="text-xs text-gray-100 flex flex-col justify-between">
              <p className="text-white font-bold">{userInfo.name}</p>
              <p>{userInfo.email}</p>
            </div>
          </div>
        ) : (
          <div
            onClick={() => signIn()}
            className="text-xs text-gray-100 flex flex-col justify-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%]"
          >
            <p>Hello, sign in</p>
            <p className="text-white font-bold flex items-center">
              Account & Lists{" "}
              <span>
                <BiCaretDown />
              </span>
            </p>
          </div>
        )}
        {/* favorite */}
        <Link
          href={"/favorite"}
          className="text-xs text-gray-100 flex flex-col justify-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%] relative"
        >
          <p>Marked</p>
          <p className="text-white font-bold">& favorite</p>
          {favoriteData.length > 0 && (
            <span className="absolute right-2 top-2 w-4 h-4 border-[1px] border-gray-400 flex items-center justify-center text-xs text-amazon_yellow">
              {favoriteData.length}
            </span>
          )}
        </Link>
        {/* cart */}
        <Link
          href={"/cart"}
          className="flex px-2 items-center border border-transparent hover:border-white cursor-pointer duration-300 h-[70%] relative"
        >
          <Image
            className="w-auto object-cover h-8"
            src={cartIcon}
            alt="cartImg"
          />
          <p className="text-sx text-white font-bold mt-3">Cart</p>
          <span className="absolute text-amazon_yellow text-sm font-semibold top-2 left-[29px]">
            {productData ? productData.length : 0}
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Header;
