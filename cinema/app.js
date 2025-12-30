const OMDB_API_KEY = "81a98890";
const SUPABASE_URL = "https://dyabpqpaynqncduadbnc.supabase.co";
const SUPABASE_KEY = "sb_publishable_TQbpM_1ypruHkx_uGKknOg_k9IFd2B3";

// Initialize Supabase
const supa = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

function App() {
  const [movies, setMovies] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [query, setQuery] = React.useState("");
  const [search, setSearch] = React.useState("");
  const [genreFilter, setGenreFilter] = React.useState("All");
  const [yearFilter, setYearFilter] = React.useState("All");
  const [typeFilter, setTypeFilter] = React.useState("All");
  const [sortBy, setSortBy] = React.useState("Date");
  const [toast, setToast] = React.useState(null);
  const [adding, setAdding] = React.useState(false);

  const [visibleCount, setVisibleCount] = React.useState(20);
  const loaderRef = React.useRef(null);

  React.useEffect(() => {
    fetchMovies();
  }, []);

  React.useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setVisibleCount(v => v + 20);
      }
    });
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [movies]);

  function showToast(msg) {
    setToast( msg);
    setTimeout(() => setToast(null), 3000);
  }

  async function fetchMovies() {
    setLoading(true);
    const { data } = await supa.from("movies").select("*");
    if (data) setMovies(data);
    setLoading(false);
  }

  async function addMovie() {
    if (!query.trim()) return;
    setAdding(true);

    const res = await fetch(
      `https://www.omdbapi.com/?t=${encodeURIComponent(query)}&apikey=${OMDB_API_KEY}`
    );
    const data = await res.json();

      if (data.Response === "True") {
        const type = data.Type === "series" ? "series" : "movie";

        const { error } = await supa.from("movies").insert([{
          title: data.Title,
          year: data.Year,
          poster: data.Poster,
          imdb_id: data.imdbID,
          rating: data.imdbRating,
          genre: data.Genre,
          plot: data.Plot,
          type
        }]);

      if (error) showToast("❌ Already exists");
      else {
        showToast(`✅ Added ${data.Title}`);
        fetchMovies();
        setQuery("");
      }
    } else showToast("❌ Not Found");

    setAdding(false);
  }

  async function removeMovie(id) {
    await supa.from("movies").delete().eq("imdb_id", id);
    setMovies(m => m.filter(x => x.imdb_id !== id));
    showToast("🗑️ Removed");
  }

  const genres = ["All", ...new Set(movies.flatMap(m => m.genre?.split(", ") || []))];
  const years = ["All", ...new Set(movies.map(m => m.year))];

  let filtered = movies.filter(m => {
    return (
      m.title.toLowerCase().includes(search.toLowerCase()) &&
      (genreFilter === "All" || m.genre?.includes(genreFilter)) &&
      (yearFilter === "All" || m.year === yearFilter) &&
      (typeFilter === "All" ||
        (typeFilter === "Movies" && m.type !== "series") ||
        (typeFilter === "TV Shows" && m.type === "series"))
    );
  });

  if (sortBy === "Rating") filtered.sort((a, b) => b.rating - a.rating);
  if (sortBy === "Year") filtered.sort((a, b) => b.year - a.year);

  const visible = filtered.slice(0, visibleCount);

    return (
      <div className="app">
        {toast && <div className="toast">{toast}</div>}

        <h1>ROYAL CINEMA</h1>
        <div className="subtitle">ULTIMATE CLOUD WATCHLIST</div>

        <div className="stats-bar">
          <div className="stat"><div className="stat-val">{movies.length}</div><div className="stat-label">Total</div></div>
          <div className="stat"><div className="stat-val">{movies.filter(m => m.type === "series").length}</div><div className="stat-label">TV Shows</div></div>
          <div className="stat"><div className="stat-val">{genres.length - 1}</div><div className="stat-label">Genres</div></div>
        </div>
      
        <div className="add-bar">
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Add Movie or TV Show..." />
          <button className="add-btn" onClick={addMovie} disabled={adding}>
            {adding ? "Adding..." : "ADD"}
          </button>
        </div>

      <div className="filter-bar">
        <input placeholder="🔍 Search..." value={search} onChange={e => setSearch(e.target.value)} />
        <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
          <option>All</option><option>Movies</option><option>TV Shows</option>
        </select>
        <select value={genreFilter} onChange={e => setGenreFilter(e.target.value)}>
          {genres.map(g => <option key={g}>{g}</option>)}
        </select>
        <select value={yearFilter} onChange={e => setYearFilter(e.target.value)}>
          {years.map(y => <option key={y}>{y}</option>)}
        </select>
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="Date">📅 Date</option>
          <option value="Rating">⭐ Rating</option>
          <option value="Year">🆕 Year</option>
        </select>
      </div>

      <div className="list">
        {loading ? <div className="empty-msg">Loading...</div> :
          visible.map(m => (
            <div className="movie" key={m.imdb_id}>
              <img src={m.poster} alt={m.title} />
              <div className="movie-info">
                <h3>{m.title}
                  <span className={`badge ${m.type === "series" ? "badge-tv" : "badge-movie"}`}>
                    {m.type === "series" ? "TV" : "MOVIE"}
                  </span>
                </h3>
                <div className="meta">
                  <span>⭐ {m.rating}</span>
                  <span>📅 {m.year}</span>
                  <span>🎬 {m.genre}</span>
                </div>
                <p>{m.plot}</p>
                <a className="trailer-btn" target="_blank"
                   href={`https://youtube.com/results?search_query=${encodeURIComponent(m.title + " trailer")}`}>
                  Trailer
                </a>
              </div>
              <button className="delete-btn" onClick={() => removeMovie(m.imdb_id)}>
                <i className="fas fa-trash"></i>
              </button>
            </div>
          ))
        }
        {visibleCount < filtered.length && <div ref={loaderRef} className="loading-sentinel">Loading more…</div>} 
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);