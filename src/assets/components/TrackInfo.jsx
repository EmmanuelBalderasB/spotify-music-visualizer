export default function TrackInfo(props) {
  const title = props.result.items[props.index].track.name;
  const artist = props.result.items[props.index].track.album.artists[0].name;
  const album = props.result.items[props.index].track.album.name;
  const info = `Popularity: ${props.result.items[props.index].track.popularity}`;
  //console.log(props.result.items[props.index]);
  return (
    <div className="flex flex-col justify-center absolute bottom-12 left-1/2 text-yellow-100 animate-swipe">
      <h3 className="text-2xl">{artist}</h3>
      <h2 className="text-xl">{title}</h2>
      <h4 className="text-md">{album}</h4>
      <p className="text-sm">{info}</p>
    </div>
  );
}
