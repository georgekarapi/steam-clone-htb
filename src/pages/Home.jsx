import React, { useEffect, useState } from 'react';
import { fetchAllTabs } from '../utils/globalUtils';
import SliderContainer from '../components/SliderContainer';
import Loading from '../components/Loading';
import { useNavigate, Link } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [games, setGames] = useState({});
  const [presentationInfo, setPresentationInfo] = useState();

  useEffect(() => {
    fetchAllTabs().then((res) => {
      setGames(res);
      setPresentationInfo(res.trending.data[0]);
    });
  }, []);
  if (Object.keys(games).length === 0) return <Loading />;
  return (
    <div className="flex flex-col gap-4 m-4">
      <div>
        {presentationInfo && (
          <div
            className="home-background rounded-md h-[240px] md:h-[400px]"
            style={{
              '--overlay-image': `url(${presentationInfo.header_image})`,
            }}
          />
        )}
      </div>
      <div>
        {Object.values(games).map((gameCategory) => (
          <div key={gameCategory.key}>
            <div className="text-lg text-white">{gameCategory.label}</div>
            <SliderContainer
              slides={gameCategory.data}
              type="games"
              autoplay={gameCategory.key === 'trending'}
              infinite
              centerMode
              onChange={(current, nextIndex) =>
                current === nextIndex
                  ? navigate(`/store/${games[gameCategory.key].data[nextIndex]._id}`)
                  : gameCategory.key === 'trending' && setPresentationInfo(games.trending.data[nextIndex])
              }
            />
          </div>
        ))}
        <div className="flex justify-center text-center">
          <Link to="/store" className="w-1/3 bg-gray-700 rounded-md p-1 m-2">
            See more...
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
