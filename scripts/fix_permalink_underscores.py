#!/usr/bin/env python3
"""
src/data 폴더의 마크다운 파일들에서:
1. 파일명의 언더스코어를 하이픈으로 변경
2. permalink의 언더스코어를 하이픈으로 변경
3. 연속된 하이픈(--)을 하나로 변경
4. 하이픈 주변의 공백 제거
5. . 을 - 로 변경
6. Φ 제거
"""
import os
import re
from pathlib import Path


def clean_hyphens(text):
    """연속된 하이픈을 하나로 변경하고 하이픈 주변 공백 제거"""
    # Φ 제거
    text = text.replace("Φ", "")
    # . 을 - 로 변경
    text = text.replace(".", "-")
    # 하이픈 주변의 공백 제거 (공백-공백, 공백-, -공백 패턴)
    text = re.sub(r"\s+-\s+", "-", text)  # 공백-공백 → -
    text = re.sub(r"\s+-", "-", text)  # 공백- → -
    text = re.sub(r"-\s+", "-", text)  # -공백 → -
    # 연속된 하이픈을 하나로 변경
    text = re.sub(r"-{2,}", "-", text)  # -- 이상 → -
    return text


def fix_file_and_permalink(file_path):
    """파일명과 permalink의 언더스코어를 하이픈으로 변경"""
    try:
        # 파일명에 언더스코어가 있는지 확인
        old_name = file_path.name
        # 확장자 분리
        if old_name.endswith(".md"):
            name_without_ext = old_name[:-3]
            extension = ".md"
        else:
            name_without_ext = old_name
            extension = ""

        # 확장자 없는 부분만 처리
        new_name_without_ext = name_without_ext.replace("_", "-")
        new_name_without_ext = clean_hyphens(new_name_without_ext)
        # 확장자 다시 붙이기
        new_name = new_name_without_ext + extension

        # 파일 내용 읽기
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()

        # permalink 라인에서 언더스코어를 하이픈으로 변경하고 정리
        def fix_permalink(match):
            permalink_value = match.group(1).replace("_", "-")
            permalink_value = clean_hyphens(permalink_value)
            return f"permalink: {permalink_value}"

        new_content = re.sub(
            r"permalink:\s*([^\n]+)",
            fix_permalink,
            content,
        )

        renamed = False
        content_changed = False

        # 파일명 변경이 필요한 경우
        if new_name != old_name:
            new_path = file_path.parent / new_name
            # 파일 내용도 업데이트
            if new_content != content:
                with open(new_path, "w", encoding="utf-8") as f:
                    f.write(new_content)
                content_changed = True
            else:
                # 내용은 변경 없지만 파일명만 변경
                with open(new_path, "w", encoding="utf-8") as f:
                    f.write(content)
            # 기존 파일 삭제
            file_path.unlink()
            renamed = True
            print(f"Renamed: {old_name} -> {new_name}")
        elif new_content != content:
            # 파일명은 변경 없지만 내용만 변경
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(new_content)
            content_changed = True
            print(f"Updated permalink: {old_name}")

        return renamed or content_changed
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return False


def main():
    data_dir = Path(__file__).parent.parent / "src" / "data"

    if not data_dir.exists():
        print(f"Error: {data_dir} does not exist")
        return

    # 언더스코어, 연속된 하이픈/공백, . 또는 Φ가 있는 md 파일들 찾기
    md_files = []
    for f in data_dir.glob("*.md"):
        name = f.name
        # 확장자 제외한 파일명
        name_without_ext = name[:-3] if name.endswith(".md") else name
        # 언더스코어가 있거나, 연속된 하이픈(--)이 있거나, 하이픈 주변에 공백이 있거나,
        # . 이나 Φ가 있는 경우
        if (
            "_" in name
            or "--" in name
            or re.search(r"\s+-|-\s+", name)
            or "." in name_without_ext
            or "Φ" in name
        ):
            md_files.append(f)
    print(f"Found {len(md_files)} markdown files to process")

    fixed_count = 0
    for md_file in md_files:
        if fix_file_and_permalink(md_file):
            fixed_count += 1

    print(f"\nTotal files processed: {fixed_count}")


if __name__ == "__main__":
    main()
