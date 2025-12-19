import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
  genre: string;
  available: boolean;
  rating: number;
  pages: number;
  isbn: string;
}

const mockBooks: Book[] = [
  { id: 1, title: "Преступление и наказание", author: "Фёдор Достоевский", year: 1866, genre: "Классика", available: true, rating: 4.9, pages: 671, isbn: "978-5-17-095423-1" },
  { id: 2, title: "Война и мир", author: "Лев Толстой", year: 1869, genre: "Классика", available: false, rating: 4.8, pages: 1225, isbn: "978-5-17-091234-7" },
  { id: 3, title: "Мастер и Маргарита", author: "Михаил Булгаков", year: 1967, genre: "Мистика", available: true, rating: 4.7, pages: 480, isbn: "978-5-389-15678-2" },
  { id: 4, title: "Анна Каренина", author: "Лев Толстой", year: 1877, genre: "Классика", available: true, rating: 4.6, pages: 864, isbn: "978-5-17-089542-3" },
  { id: 5, title: "Евгений Онегин", author: "Александр Пушкин", year: 1833, genre: "Поэзия", available: true, rating: 4.8, pages: 224, isbn: "978-5-699-84523-1" },
  { id: 6, title: "Идиот", author: "Фёдор Достоевский", year: 1869, genre: "Классика", available: false, rating: 4.7, pages: 640, isbn: "978-5-17-088765-4" },
  { id: 7, title: "Доктор Живаго", author: "Борис Пастернак", year: 1957, genre: "Классика", available: true, rating: 4.5, pages: 592, isbn: "978-5-17-095234-8" },
  { id: 8, title: "Братья Карамазовы", author: "Фёдор Достоевский", year: 1880, genre: "Классика", available: true, rating: 4.9, pages: 840, isbn: "978-5-389-11234-5" },
];

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [selectedAuthor, setSelectedAuthor] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [sortBy, setSortBy] = useState("relevance");
  const [currentPage, setCurrentPage] = useState(1);

  const booksPerPage = 6;

  const genres = ["all", ...Array.from(new Set(mockBooks.map(b => b.genre)))];
  const authors = ["all", ...Array.from(new Set(mockBooks.map(b => b.author)))];
  const years = ["all", ...Array.from(new Set(mockBooks.map(b => b.year.toString())))];

  const filteredBooks = mockBooks.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === "all" || book.genre === selectedGenre;
    const matchesAuthor = selectedAuthor === "all" || book.author === selectedAuthor;
    const matchesYear = selectedYear === "all" || book.year.toString() === selectedYear;
    const matchesAvailability = availabilityFilter === "all" || 
                               (availabilityFilter === "available" && book.available) ||
                               (availabilityFilter === "unavailable" && !book.available);
    
    return matchesSearch && matchesGenre && matchesAuthor && matchesYear && matchesAvailability;
  });

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    switch (sortBy) {
      case "title":
        return a.title.localeCompare(b.title);
      case "year":
        return b.year - a.year;
      case "rating":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(sortedBooks.length / booksPerPage);
  const startIndex = (currentPage - 1) * booksPerPage;
  const displayedBooks = sortedBooks.slice(startIndex, startIndex + booksPerPage);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-5xl font-bold text-primary mb-2 tracking-tight">Библиотечный каталог</h1>
          <p className="text-muted-foreground text-lg italic">Поиск изданий в электронной картотеке</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="relative mb-6">
            <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              type="text"
              placeholder="Введите название книги или имя автора..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-lg border-2"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <Select value={selectedGenre} onValueChange={setSelectedGenre}>
              <SelectTrigger>
                <SelectValue placeholder="Жанр" />
              </SelectTrigger>
              <SelectContent>
                {genres.map(genre => (
                  <SelectItem key={genre} value={genre}>
                    {genre === "all" ? "Все жанры" : genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedAuthor} onValueChange={setSelectedAuthor}>
              <SelectTrigger>
                <SelectValue placeholder="Автор" />
              </SelectTrigger>
              <SelectContent>
                {authors.map(author => (
                  <SelectItem key={author} value={author}>
                    {author === "all" ? "Все авторы" : author}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger>
                <SelectValue placeholder="Год издания" />
              </SelectTrigger>
              <SelectContent>
                {years.map(year => (
                  <SelectItem key={year} value={year}>
                    {year === "all" ? "Все годы" : year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Наличие" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все книги</SelectItem>
                <SelectItem value="available">В наличии</SelectItem>
                <SelectItem value="unavailable">Выдано</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Сортировка" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">По релевантности</SelectItem>
                <SelectItem value="title">По названию</SelectItem>
                <SelectItem value="year">По году</SelectItem>
                <SelectItem value="rating">По рейтингу</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <p>Найдено записей: <span className="font-semibold text-foreground">{sortedBooks.length}</span></p>
            <p>Страница {currentPage} из {totalPages}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {displayedBooks.map(book => (
            <Card key={book.id} className="hover:shadow-lg transition-shadow duration-300 border-2">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <Badge variant={book.available ? "default" : "secondary"} className="text-xs">
                    {book.available ? "В наличии" : "Выдано"}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Icon name="Star" size={16} className="fill-accent text-accent" />
                    <span className="text-sm font-semibold">{book.rating}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-primary mb-2 leading-tight">{book.title}</h3>
                <p className="text-foreground mb-1 italic">{book.author}</p>
                
                <div className="space-y-1 text-sm text-muted-foreground mb-4">
                  <p>Год издания: {book.year}</p>
                  <p>Жанр: {book.genre}</p>
                  <p>Страниц: {book.pages}</p>
                  <p className="font-mono text-xs">ISBN: {book.isbn}</p>
                </div>

                <Button variant="outline" className="w-full hover:bg-primary hover:text-primary-foreground transition-colors">
                  <Icon name="BookOpen" size={16} className="mr-2" />
                  Подробнее
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              <Icon name="ChevronLeft" size={16} />
            </Button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className="min-w-[40px]"
              >
                {page}
              </Button>
            ))}

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              <Icon name="ChevronRight" size={16} />
            </Button>
          </div>
        )}
      </main>

      <footer className="border-t border-border mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="text-sm">© 2024 Библиотечный каталог. Система управления фондом.</p>
        </div>
      </footer>
    </div>
  );
}
