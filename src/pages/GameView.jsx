import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { fetchGameInfo, fetchTrending } from '../utils/globalUtils';
import { MdOutlineArrowBackIos } from 'react-icons/md';
import { GlobalContext } from '../utils/ContextProvider';

import GameCategories from '../components/GameCategories';
import Chip from '../components/Chip';
import PlatformIcons from '../components/PlatformIcons';
import TabWrapper from '../components/Tabs/TabWrapper';
import SliderContainer from '../components/SliderContainer';
import Loading from '../components/Loading';

const GameView = () => {
  const { cart, setCart } = useContext(GlobalContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { gameId } = useParams();
  const [gameInfo, setGameInfo] = useState();
  const [trending, setTrending] = useState();
  const [loading, setLoading] = useState(false);
  const [activePreviewTab, setActivePreviewTab] = useState('screenshots');
  const [previewFrame, setPreviewFrame] = useState();
  const previewRef = useRef(null);
  const videoRef = useRef(null);

  const gameInfoTabs = {
    screenshots: { key: 'screenshots', label: 'Screenshots' },
    trailers: { key: 'trailers', label: 'Trailers' },
  };

  useEffect(() => {
    if (!location.hash) {
      setPreviewFrame();
      setLoading(true);
      window.scrollTo(0, 0);
    }
  }, [location]);

  useEffect(() => {
    if (gameInfo) {
      setLoading(false);
      window.scrollTo(0, 0);
    }
  }, [gameInfo]);

  useEffect(() => {
    previewRef.current?.scrollIntoView();
    videoRef.current?.load();
  }, [previewRef, previewFrame]);

  useEffect(() => {
    fetchGameInfo(gameId).then((res) => setGameInfo(res[0]));
    fetchTrending().then((res) => setTrending(res));
  }, [gameId]);
  if (!gameInfo || loading) return <Loading />;
  return (
    <div className="flex flex-col gap-4 m-4">
      <div>
        <Link to="/store">
          <span className="flex items-center gap-2">
            <MdOutlineArrowBackIos size="18px" /> Go back to Store
          </span>
        </Link>
      </div>
      <div className="flex flex-col md:flex-row lg:h-[45vh]">
        <div className="w-full md:h-[300px] md:w-7/12 max-w-[800px]">
          <img
            className="w-full h-auto rounded-md border-[1px] border-neutral-800"
            src={gameInfo.header_image}
            alt={gameInfo.name}
            loading="lazy"
          />
        </div>
        <div className="flex-auto md:ml-4 md:mt-2">
          <div className="text-2xl font-bold mb-2 cursor-default">{gameInfo.name}</div>
          <div className="text-xs flex gap-2 flex-wrap md:flex-nowrap my-2">
            <GameCategories categories={gameInfo.categories} />
          </div>
          <div className="text-xl flex gap-2 items-center">
            {gameInfo.price_overview && gameInfo.price_overview.discount_percent !== 0 && (
              <>
                <Chip isBlue>-{gameInfo.price_overview?.discount_percent}%</Chip>
                <div className="text-sm text-gray-300 line-through">{gameInfo.price_overview?.initial_formatted}</div>
              </>
            )}
            <div className="font-medium">{gameInfo.price_overview?.final_formatted}</div>
          </div>
          <button
            className="w-full bg-indigo-800 rounded-md p-1 hover:bg-indigo-900"
            onClick={() => setCart({ ...cart, [gameId]: { ...gameInfo } })}
          >
            Add to Cart
          </button>
          {/* Could be cleaner with a table component */}
          <ul className="game-info-table bg-gray-700 my-2 px-4 py-1.5 rounded-md ">
            <li className="flex items-center">
              Platforms:{' '}
              {
                <span className="ml-4">
                  <PlatformIcons platforms={gameInfo.platforms} />
                </span>
              }
            </li>
            <li>Developers: {gameInfo.developers.join(',')}</li>
            <li>Publishers: {gameInfo.publishers.join(',')}</li>
            <li>Release Date: {gameInfo.release_date.coming_soon ? 'Coming Soon' : gameInfo.release_date.date}</li>
          </ul>
        </div>
      </div>
      <div ref={previewRef}>
        {previewFrame && (
          <>
            {previewFrame.type === 'image' ? (
              <img className="m-auto" src={previewFrame.src} alt="Preview" />
            ) : (
              <video ref={videoRef} width="100%" controls>
                <source src={previewFrame.src} type="video/webm" />
              </video>
            )}
          </>
        )}
      </div>
      <div>
        <TabWrapper initialTab={activePreviewTab} tabs={gameInfoTabs} onChange={setActivePreviewTab} />
        <SliderContainer
          slides={activePreviewTab === 'screenshots' ? gameInfo.screenshots : gameInfo.movies}
          type={activePreviewTab === 'screenshots' ? 'screenshots' : 'trailers'}
          infinite
          onChange={(_, index) =>
            activePreviewTab === 'screenshots'
              ? setPreviewFrame({ type: 'image', src: gameInfo.screenshots[index].path_full })
              : setPreviewFrame({ type: 'video', src: gameInfo.movies[index % 1 === 0 ? index : 0].webm[480] })
          }
        />
      </div>
      <div className="my-2">
        <div className="text-md font-bold  mb-2">About Game</div>
        <div>{gameInfo.short_description}</div>
      </div>
      <div className="my-2">
        <div className="text-md font-bold mb-2">You may wanna try...</div>
        {trending && (
          <SliderContainer
            slides={trending}
            type="games"
            centerMode
            infinite
            onChange={(current, nextIndex) => current === nextIndex && navigate(`/store/${trending[nextIndex]._id}`)}
          />
        )}
      </div>
    </div>
  );
};

export default GameView;
