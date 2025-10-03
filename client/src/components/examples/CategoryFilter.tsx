import CategoryFilter from '../CategoryFilter'

export default function CategoryFilterExample() {
  const categories = ['AI & Technology', 'Web Development', 'Design', 'Marketing', 'Writing'];
  
  return (
    <div className="p-6">
      <CategoryFilter 
        categories={categories}
        onFilterChange={(category) => console.log('Selected category:', category)}
      />
    </div>
  )
}
