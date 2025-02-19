// GitHub repository details
const GITHUB_OWNER = "xiaochaoye"
const GITHUB_REPO = "game-and-editor-site"
const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN

export interface Issue {
  title: string
  body: string
  created_at: string
}

export async function fetchIssues(): Promise<Issue[]> {
  try {
    const response = await fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/issues`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    })
    if (!response.ok) {
      throw new Error("Failed to fetch issues")
    }
    const data = await response.json()
    if (Array.isArray(data)) {
      return data
    } else {
      throw new Error("Received data is not an array")
    }
  } catch (error) {
    console.error("Error fetching issues:", error)
    throw error
  }
}

export async function createIssue(name: string, email: string, message: string): Promise<void> {
  try {
    const response = await fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/issues`, {
      method: "POST",
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: `Feedback from ${name}`,
        body: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      }),
    })
    if (!response.ok) {
      throw new Error("Failed to create issue")
    }
  } catch (error) {
    console.error("Error creating issue:", error)
    throw error
  }
}

