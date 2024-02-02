<template>
  <div class="about">
    <h1 class="font-medium text-3xl green">
      O projekcie
    </h1>
    <div class="mt-4">
      <section class="mb-8">
        <h2 class="text-2xl text-white mb-2">Technologie i narzędzia</h2>
        <p><strong>Vue.js:</strong> Jako podstawę projektu wybrałem Vue.js ze względu na jego elastyczność i efektywność w
          tworzeniu interaktywnych interfejsów użytkownika.</p>
        <p><strong>Axios:</strong> Do komunikacji z zewnętrznymi API wykorzystałem Axios - popularną bibliotekę do
          wykonywania żądań HTTP.</p>
        <p><strong>TailwindCSS:</strong> Chociaż w projektach wykorzystałem TailwindCSS do stylizacji większości elementów
          strony, nie zastosowałem go wszędzie. Na początkowych etapach projektu skorzystałem z domyślnej struktury strony
          startowej Vue.js, która nie była modyfikowana przy użyciu TailwindCSS, aby szybko rozpocząć pracę i skupić się
          na logice aplikacji.</p>
      </section>

      <section>
        <h2 class="text-2xl text-white mb-2">Wykorzystane endpointy API</h2>
        <ul class="list-disc pl-5">
          <li><strong>Posty:</strong> <a href="https://jsonplaceholder.typicode.com/posts"
              class="text-blue-400">https://jsonplaceholder.typicode.com/posts</a></li>
          <li><strong>Szczegóły posta:</strong> <a href="https://jsonplaceholder.typicode.com/posts/{id}"
              class="text-blue-400">https://jsonplaceholder.typicode.com/posts/{id}</a></li>
          <li><strong>Komentarze:</strong> <a href="https://jsonplaceholder.typicode.com/posts/{id}/comments"
              class="text-blue-400">https://jsonplaceholder.typicode.com/posts/{id}/comments</a></li>
          <li><strong>Informacje o użytkowniku:</strong> <a href="https://jsonplaceholder.typicode.com/users/{id}"
            class="text-blue-400">https://jsonplaceholder.typicode.com/users/{id}</a></li>
      </ul>
    </section>
  </div>

</div></template>
