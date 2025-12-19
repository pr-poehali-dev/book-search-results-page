import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Icon from "@/components/ui/icon";

export default function BookReservation() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const bookTitle = searchParams.get("title") || "Преступление и наказание";
  const bookAuthor = searchParams.get("author") || "Фёдор Достоевский";
  const bookYear = searchParams.get("year") || "1866";
  const bookIsbn = searchParams.get("isbn") || "978-5-17-095423-1";

  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    middleName: "",
    libraryCard: "",
    email: "",
    phone: "",
    reservationDate: new Date().toISOString().split('T')[0],
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setShowSuccess(true);
    
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  const isFormValid = formData.lastName && formData.firstName && formData.libraryCard && formData.email;

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-900">
        <div className="container mx-auto px-4 py-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="mb-4 text-gray-900 hover:bg-gray-100"
          >
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Вернуться к каталогу
          </Button>
          <h1 className="text-4xl font-bold text-gray-900">Бронирование книги</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {showSuccess && (
          <Alert className="mb-6 border-blue-600 bg-blue-50">
            <Icon name="CheckCircle" className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-900">
              Бронирование успешно оформлено! Книга будет ожидать вас в течение 3 дней.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-2 border-gray-900">
            <CardHeader className="bg-gray-900 text-white">
              <CardTitle className="text-2xl">Информация о книге</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-1">Название</h3>
                <p className="text-lg text-gray-900">{bookTitle}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-1">Автор</h3>
                <p className="text-lg text-gray-900">{bookAuthor}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-1">Год издания</h3>
                <p className="text-lg text-gray-900">{bookYear}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-1">ISBN</h3>
                <p className="text-sm font-mono text-gray-700">{bookIsbn}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-gray-900">
            <CardHeader className="bg-gray-900 text-white">
              <CardTitle className="text-2xl">Данные читателя</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="lastName" className="text-gray-900 font-semibold">
                    Фамилия *
                  </Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    className="border-2 border-gray-900 focus:border-blue-600"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="firstName" className="text-gray-900 font-semibold">
                    Имя *
                  </Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    className="border-2 border-gray-900 focus:border-blue-600"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="middleName" className="text-gray-900 font-semibold">
                    Отчество
                  </Label>
                  <Input
                    id="middleName"
                    value={formData.middleName}
                    onChange={(e) => handleInputChange("middleName", e.target.value)}
                    className="border-2 border-gray-900 focus:border-blue-600"
                  />
                </div>

                <div>
                  <Label htmlFor="libraryCard" className="text-gray-900 font-semibold">
                    Номер читательского билета *
                  </Label>
                  <Input
                    id="libraryCard"
                    value={formData.libraryCard}
                    onChange={(e) => handleInputChange("libraryCard", e.target.value)}
                    className="border-2 border-gray-900 focus:border-blue-600"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-gray-900 font-semibold">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="border-2 border-gray-900 focus:border-blue-600"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-gray-900 font-semibold">
                    Телефон
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="border-2 border-gray-900 focus:border-blue-600"
                  />
                </div>

                <div>
                  <Label htmlFor="reservationDate" className="text-gray-900 font-semibold">
                    Дата получения
                  </Label>
                  <Input
                    id="reservationDate"
                    type="date"
                    value={formData.reservationDate}
                    onChange={(e) => handleInputChange("reservationDate", e.target.value)}
                    className="border-2 border-gray-900 focus:border-blue-600"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    disabled={!isFormValid || isSubmitted}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg font-semibold"
                  >
                    <Icon name="BookCheck" size={20} className="mr-2" />
                    Подтвердить бронирование
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/")}
                    className="border-2 border-gray-900 text-gray-900 hover:bg-gray-100"
                  >
                    Отмена
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6 border-2 border-blue-600 bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <Icon name="Info" className="text-blue-600 mt-1" size={20} />
              <div className="text-sm text-gray-900">
                <p className="font-semibold mb-2">Условия бронирования:</p>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Книга будет зарезервирована на 3 дня</li>
                  <li>Уведомление о готовности придёт на указанный email</li>
                  <li>Срок выдачи книги составляет 14 дней</li>
                  <li>При себе необходимо иметь читательский билет</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
