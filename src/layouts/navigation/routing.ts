const useNavigationRouting = () => {
  return [
    {
      title: 'Fotocasa',
      path: "/listings/fotocasa",
      icon: "tabler:smart-home",
      action: 'see',
      subject: 'user-pages'
    },
    {
      title: 'Idealista',
      path: '/listings/idealista',
      icon: 'tabler:smart-home',
      action: 'see',
      subject: 'user-pages'
    },
  ]
}


export default useNavigationRouting
