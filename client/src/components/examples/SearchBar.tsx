import SearchBar from '../SearchBar'

export default function SearchBarExample() {
  return (
    <div className="p-6 max-w-2xl">
      <SearchBar onSearch={(query) => console.log('Searching for:', query)} />
    </div>
  )
}
