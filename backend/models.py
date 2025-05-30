# backend/models.py

from pydantic import BaseModel
from typing import List, Optional

class TimeSlot(BaseModel):
    day: str            # "월"/"화"/"수"/"목"/"금"/"토"/"일"
    start_time: str     # "HH:MM"
    end_time: str       # "HH:MM"
    location: List[str] # ["건물", "강의실"]

class Feedback(BaseException):
    difficulty: List[float]     # [평점_평균, 인원]
    satisfaction: List[float]   # [만족도_평균, 인원]
    preview_comments: List[str] # ["후기1", "후기2", ...]

class Course(BaseException):
    id: str                 # "학수번호"
    name: str               # "강의명"
    professor: str          # "교수명"
    credicts: int           # 1/2/3 (취득학점)
    required: bool          # true(필수) / false(선택)
    grade_limit: List[int]  # [1, 2, 3, 4] (수강 가능한 학년)
    type: str               # "전공" / "교양"
    method: str             # "대면" / "실시간 화상" / "동영상"
    scedule: List[TimeSlot] # 강의 시간표
    grading: str            # "절대평가" / "상대평가"
    team_project: bool      # true(있음) / false(없음)
    feedback: Feedback      # 학생 피드백
    