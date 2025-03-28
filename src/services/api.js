const BASE_URL = "http://localhost:8080";

export async function apiFetch(endpoint, options = {}, baseURL = BASE_URL) {
  const url = `${baseURL}${endpoint}`;

  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  const config = {
    ...options,
    headers: { ...defaultHeaders, ...options.headers },
    credentials: "include",
  };

  if (
    config.headers["Content-Type"] === "application/json" &&
    config.body !== undefined &&
    typeof config.body !== "string"
  ) {
    try {
      config.body = JSON.stringify(config.body);
    } catch (error) {
      throw new Error("Erro na serialização do body: " + error.message);
    }
  }

  try {
    const response = await fetch(url, config);

    if (response.status === 204) {
      return null;
    }

    const contentType = response.headers.get("Content-Type") || "";

    if (!response.ok) {
      let errorMessage = response.statusText;

      try {
        const errorBody = await response.text();
        
        if (contentType.includes("application/json")) {
          const parsedError = JSON.parse(errorBody);
          errorMessage = parsedError.message || errorMessage;
        } else {
          errorMessage = errorBody; 
        }
      } catch (parseError) {
        errorMessage = `Falha ao processar resposta do servidor: ${parseError.message}`;
      }

      const statusMessages = {
        400: "Requisição inválida",
        401: "Autenticação necessária",
        403: "Acesso proibido",
        404: "Recurso não encontrado",
        409: "Conflito de dados",
        500: "Erro interno do servidor",
      };

      throw new Error(
        errorMessage || statusMessages[response.status] || `Erro ${response.status} na requisição`
      );
    }

    if (contentType.includes("application/json")) {
      return await response.json();
    }

    return await response.text();
  } catch (error) {
    const errorMap = {
      TypeError: "Falha na conexão com o servidor",
      AbortError: "Requisição cancelada por timeout",
      SyntaxError: "Resposta inválida do servidor",
    };

    const message = errorMap[error.name] || error.message;
    throw new Error(message, { cause: error });
  }
}
