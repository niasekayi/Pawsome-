from dataclasses import dataclass
from typing import Optional, List


@dataclass
class Opportunity:
    id: str
    name: str
    description: str
    logoUrl: str
    aboutUrl: str
    volunteerUrl: str
    zipCodes: List[str]
    category: str
    summary: Optional[str] = None

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "summary": self.summary,
            "logoUrl": self.logoUrl,
            "aboutUrl": self.aboutUrl,
            "volunteerUrl": self.volunteerUrl,
            "zipCodes": self.zipCodes,
            "category": self.category,
        }

    @classmethod
    def from_dict(cls, data: dict) -> "Opportunity":
        return cls(
            id=data["id"],
            name=data["name"],
            description=data["description"],
            summary=data.get("summary"),
            logoUrl=data.get("logoUrl", ""),
            aboutUrl=data.get("aboutUrl", ""),
            volunteerUrl=data.get("volunteerUrl", ""),
            zipCodes=data.get("zipCodes", []),
            category=data.get("category", "Community"),
        )
