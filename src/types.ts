export interface AuditResult {
  roast: string;
  status: string;
  slogan: string;
  actionRequired: string;
  isFallback?: boolean;
}

export interface VoterCardData {
  name: string;
  designation: string;
  avatar: string;
  issueDate: string;
  cardId: string;
}

export interface ManifestoItem {
  id: number;
  unhumorousTitle: string;
  comedyDetail: string;
  punishment: string;
}

export interface MemePoster {
  id: number;
  title: string;
  slogan: string;
  hindiSlogan: string;
  type: "warning" | "rally" | "motivational" | "guerilla";
  vibe: string;
}

export interface ScoreState {
  score: number;
  highScore: number;
  repelledCount: number;
  level: number;
  gameOver: boolean;
}
