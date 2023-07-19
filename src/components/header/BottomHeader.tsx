import {LuMenu} from 'react-icons/lu'
import { useDispatch, useSelector } from 'react-redux';
import { StateProps } from '../../../type';
import { signOut } from 'next-auth/react';
import { removeUser } from '@/store/nextSlice';
const BottomHeader = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector(
    (state: StateProps) => state.next
  );
  const handleSignOut = () =>{
    signOut();
    dispatch(removeUser());
  }
  return <div className='w-full h-10 bg-amazon_light text-white px-4 text-sm flex items-center'>
    <p className='flex items-center px-2 border border-transparent gap-1 h-8 hover:border-white duration-300 cursor-pointer'>
        <LuMenu className='text-xl'/> All
    </p>
    <p className='hidden md:inline-flex items-center px-2 border border-transparent h-8 hover:border-white duration-300 cursor-pointer'>Todays Deals</p>
    <p className='hidden md:inline-flex items-center px-2 border border-transparent h-8 hover:border-white duration-300 cursor-pointer'>Customer Service</p>
    <p className='hidden md:inline-flex items-center px-2 border border-transparent h-8 hover:border-white duration-300 cursor-pointer'>Registry</p>
    <p className='hidden md:inline-flex items-center px-2 border border-transparent h-8 hover:border-white duration-300 cursor-pointer'>Gift Cards</p>
    <p className='hidden md:inline-flex items-center px-2 border border-transparent h-8 hover:border-white duration-300 cursor-pointer'>Sell</p>
    {userInfo && (
      <button onClick={handleSignOut} className='hidden md:inline-flex items-center px-2 border border-transparent h-8 hover:border-red-600 text-amazon_yellow hover:text-red-400 duration-300 cursor-pointer'>Sign out</button>
    )}
  </div>;
};

export default BottomHeader;
