/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, BarChart2, TrendingUp, AlertTriangle } from 'lucide-react'

// To test the application, you can use the following credentials:
// - Para colaborador: email colaborador@email.com, senha 12345678
// - Para gestor: email gestor@email.com, senha 12345678

// Simulated feedback data
const feedbackData = [
  { id: 1, date: "2023-11-18", time: "09:15", content: "A reunião de equipe hoje foi muito produtiva." },
  { id: 2, date: "2023-11-19", time: "17:45", content: "Me sinto estressado com o prazo que está chegando." },
  { id: 3, date: "2023-11-20", time: "14:30", content: "Ótimo dia de trabalho! O novo projeto é empolgante." },
]

// Simulated data for the manager's dashboard
const dashboardData = {
  keywordData: [
    { keyword: "Produtivo", count: 15 },
    { keyword: "Estressado", count: 8 },
    { keyword: "Empolgado", count: 12 },
    { keyword: "Sobrecarregado", count: 6 },
    { keyword: "Satisfeito", count: 10 },
  ],
  departmentSentiment: [
    { department: "Engenharia", sentiment: 0.8 },
    { department: "Marketing", sentiment: 0.6 },
    { department: "Vendas", sentiment: 0.7 },
    { department: "Suporte ao Cliente", sentiment: 0.5 },
  ],
  recentFeedbacks: [
    { id: 1, content: "A nova ferramenta de gerenciamento de projetos melhorou muito nosso fluxo de trabalho.", sentiment: "positivo" },
    { id: 2, content: "Precisamos de mais atividades de team building para melhorar a comunicação.", sentiment: "neutro" },
    { id: 3, content: "A temperatura do escritório está muito fria, está afetando a produtividade.", sentiment: "negativo" },
  ],
  actionItems: [
    { id: 1, task: "Revisar e abordar preocupações sobre a temperatura do escritório", priority: "alta" },
    { id: 2, task: "Planejar atividade de team building para o próximo mês", priority: "média" },
    { id: 3, task: "Agendar sessão de treinamento para nova ferramenta de gerenciamento de projetos", priority: "baixa" },
  ]
}

export default function Component() {
  const [currentScreen, setCurrentScreen] = useState<keyof typeof screens>("login")
  const [userType, setUserType] = useState<"employee" | "manager">("employee")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  const screens = {
    login: <LoginScreen onLogin={(type: "employee" | "manager") => {
      setUserType(type)
      setIsLoggedIn(true)
      setCurrentScreen(type === "employee" ? "feedback" : "dashboard")
    }} />,
    feedback: <FeedbackScreen onSubmit={() => setCurrentScreen("confirmation")} />,
    confirmation: <ConfirmationScreen onViewHistory={() => setCurrentScreen("history")} onLogout={handleLogout} />,
    dashboard: <ManagerDashboard onLogout={handleLogout} />,
    history: <FeedbackHistory onBack={() => setCurrentScreen("confirmation")} />
  }

  function handleLogout() {
    setIsLoggedIn(false)
    setCurrentScreen("login")
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-800 text-white">
        <CardContent className="p-6">
          {screens[currentScreen]}
        </CardContent>
      </Card>
    </div>
  )
}

function LoginScreen({ onLogin }: { onLogin: (type: "employee" | "manager") => void }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = () => {
    if (email === "colaborador@email.com" && password === "12345678") {
      onLogin("employee")
    } else if (email === "gestor@email.com" && password === "12345678") {
      onLogin("manager")
    } else {
      setError("Credenciais inválidas. Por favor, tente novamente.")
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">
          <span className="text-purple-400">Up</span>Flow
        </h1>
        <p className="text-sm text-gray-400">Energize o trabalho, otimize a vida.</p>
      </div>
      
      <div className="space-y-4">
        <Input
          type="email"
          placeholder="Digite seu e-mail"
          className="bg-gray-700 border-gray-600"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Digite sua senha"
          className="bg-gray-700 border-gray-600"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button
          className="w-full bg-purple-600 hover:bg-purple-700"
          onClick={handleLogin}
        >
          Entrar
        </Button>
      </div>

      <div className="pt-6 text-center space-y-2">
        <MessageSquare className="mx-auto h-12 w-12 text-purple-400" />
        <p className="text-purple-400 font-medium">Não tenha medo.</p>
        <p className="text-sm text-gray-400">O seu feedback será anônimo e ajudará a todos!</p>
      </div>
    </div>
  )
}

function FeedbackScreen({ onSubmit }: { onSubmit: () => void }) {
  const [feedback, setFeedback] = useState("")

  const handleSubmit = () => {
    feedbackData.push({
      id: feedbackData.length + 1,
      date: new Date().toISOString().split("T")[0],
      time: new Date().toLocaleTimeString().slice(0, 5),
      content: feedback
    })
    // Here you would typically send the feedback to your backend
    console.log("Feedback submitted:", feedback)
    onSubmit()
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">
          <span className="text-purple-400">Up</span>Flow
        </h1>
        <p className="text-sm text-gray-400">De seu feedback e a IA irá lhe ajudar</p>
      </div>

      <textarea
        className="w-full h-32 p-3 rounded-md bg-gray-700 border-gray-600 text-white"
        placeholder="Como foi seu dia? Compartilhe seus pensamentos, ideias e sugestões."
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      />

      <Button
        className="w-full bg-purple-600 hover:bg-purple-700"
        onClick={handleSubmit}
        disabled={!feedback.trim()}
      >
        Enviar Feedback
      </Button>
    </div>
  )
}

function ConfirmationScreen({ onViewHistory, onLogout } : { onViewHistory: () => void, onLogout: () => void }) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold">
          <span className="text-purple-400">Up</span>Flow
        </h1>
        <p className="text-xl font-medium">Obrigado por enviar o seu Feedback!</p>
      </div>

      <div className="space-y-3">
        <Button
          className="w-full bg-purple-600 hover:bg-purple-700"
          onClick={onViewHistory}
        >
          Histórico de feedbacks
        </Button>
        <Button
          variant="outline"
          className="w-full text-black"
          onClick={onLogout}
        >
          Sair
        </Button>
      </div>
    </div>
  )
}

function ManagerDashboard({ onLogout } : { onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    // This effect would typically fetch the actual data from your backend
    console.log("Fetching dashboard data...")
  }, [])

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">Dashboard do <span className="text-purple-400">Gestor</span></h1>
        <p className="text-sm text-gray-400">Visão geral dos feedbacks e ações</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="actions">Ações</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center">
                <BarChart2 className="mr-2" /> Palavras-chave principais
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {dashboardData.keywordData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-24 text-sm">{item.keyword}</div>
                    <div className="flex-1 bg-gray-600 rounded-full h-4">
                      <div
                        className="bg-purple-500 rounded-full h-4"
                        style={{ width: `${(item.count / Math.max(...dashboardData.keywordData.map(d => d.count))) * 100}%` }}
                      ></div>
                    </div>
                    <div className="w-8 text-right text-sm">{item.count}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center">
                <TrendingUp className="mr-2" /> Sentimento por Departamento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {dashboardData.departmentSentiment.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-32 text-sm">{item.department}</div>
                    <div className="flex-1 bg-gray-600 rounded-full h-4">
                      <div
                        className={`rounded-full h-4 ${item.sentiment > 0.7 ? 'bg-green-500' : item.sentiment > 0.4 ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{ width: `${item.sentiment * 100}%` }}
                      ></div>
                    </div>
                    <div className="w-12 text-right text-sm">{(item.sentiment * 100).toFixed(0)}%</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center">
                <MessageSquare className="mr-2" /> Feedbacks Recentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {dashboardData.recentFeedbacks.map((feedback) => (
                  <div key={feedback.id} className="p-2 bg-gray-700 rounded-md text-white">
                    <p className="text-sm">{feedback.content}</p>
                    <span className={`text-xs ${
                      feedback.sentiment === 'positivo' ? 'text-green-400' :
                      feedback.sentiment === 'negativo' ? 'text-red-400' : 'text-yellow-400'
                    }`}>
                      {feedback.sentiment}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="actions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center">
                <AlertTriangle className="mr-2" /> Itens de Ação
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {dashboardData.actionItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-2 bg-gray-700 rounded-md text-white">
                    <span className="text-sm">{item.task}</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      item.priority === 'alta' ? 'bg-red-500' :
                      item.priority === 'média' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}>
                      {item.priority}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Button
        className="w-full bg-purple-600 hover:bg-purple-700 text-white"
        onClick={onLogout}
      >
        Sair
      </Button>
    </div>
  )
}

function FeedbackHistory({ onBack } : { onBack: () => void }) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">
          <span className="text-purple-400">Up</span>Flow
        </h1>
        <p className="text-sm text-gray-400">Histórico de Feedbacks</p>
      </div>

      <div className="space-y-4">
        {feedbackData.sort((a, b) => a.id > b.id ? -1 : 1).map((feedback) => (
          <div key={feedback.id} className="p-4 bg-gray-700 rounded-md">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-semibold">{feedback.date}</p>
              <p className="text-sm text-gray-400">{feedback.time}</p>
            </div>
            <p className="text-sm">{feedback.content}</p>
          </div>
        ))}
      </div>

      <Button
        className="w-full bg-purple-600 hover:bg-purple-700 text-white"
        onClick={onBack}
      >
        Voltar
      </Button>
    </div>
  )
}