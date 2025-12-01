#!/usr/bin/env python3
"""
마크다운 파일에서 **텍스트** 형식의 볼드체 앞뒤에 공백을 추가하는 스크립트
"""
import re
import os
from pathlib import Path


def fix_bold_spacing(text):
    """
    **텍스트** 형식의 볼드체 앞뒤에 공백을 추가
    - 첫 번째 ** 앞에 공백이 없으면 추가
    - 두 번째 ** 뒤에 공백이 없으면 추가
    """
    # **텍스트** 패턴을 찾되, 이미 공백이 있는 경우는 제외
    # (?<!\s) - 앞에 공백이 없는 경우
    # (?<!\*\*) - **가 연속되지 않은 경우 (중첩 방지)
    # \*\*([^*]+?)\*\* - **텍스트** 패턴
    # (?!\s) - 뒤에 공백이 없는 경우

    def add_spaces(match):
        bold_text = match.group(0)  # 전체 매칭된 텍스트 (**텍스트**)
        before = match.start()
        after = match.end()

        # 앞뒤 문자 확인
        char_before = text[before - 1] if before > 0 else ""
        char_after = text[after] if after < len(text) else ""

        result = bold_text

        # 앞에 공백이 없으면 추가 (줄 시작이 아니고, 이미 공백/줄바꿈이 아닌 경우)
        if before > 0 and char_before not in [" ", "\n", "\t"]:
            result = " " + result

        # 뒤에 공백이 없으면 추가 (줄 끝이 아니고, 이미 공백/줄바꿈이 아닌 경우)
        if after < len(text) and char_after not in [" ", "\n", "\t"]:
            result = result + " "

        return result

    # **텍스트** 패턴 찾기 (중첩된 **는 제외)
    pattern = r"(?<!\*)\*\*([^*]+?)\*\*(?!\*)"
    return re.sub(pattern, add_spaces, text)


def process_file(file_path):
    """단일 파일 처리"""
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()

        original_content = content
        fixed_content = fix_bold_spacing(content)

        if original_content != fixed_content:
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(fixed_content)
            print(f"수정됨: {file_path}")
            return True
        else:
            print(f"변경 없음: {file_path}")
            return False
    except Exception as e:
        print(f"오류 발생 ({file_path}): {e}")
        return False


def main():
    """메인 함수"""
    # src/data 디렉토리 경로
    data_dir = Path(__file__).parent.parent / "src" / "data"

    if not data_dir.exists():
        print(f"디렉토리를 찾을 수 없습니다: {data_dir}")
        return

    # 모든 .md 파일 찾기
    md_files = list(data_dir.glob("*.md"))

    if not md_files:
        print(f"{data_dir}에 마크다운 파일이 없습니다.")
        return

    print(f"{len(md_files)}개의 마크다운 파일을 처리합니다...\n")

    modified_count = 0
    for md_file in md_files:
        if process_file(md_file):
            modified_count += 1

    print(f"\n처리 완료: {modified_count}개 파일이 수정되었습니다.")


if __name__ == "__main__":
    main()
