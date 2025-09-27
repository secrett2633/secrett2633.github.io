# Jekyll 플러그인: 빌드 타임에 카테고리별 포스트 수 계산
# 성능 최적화를 위해 런타임이 아닌 빌드 타임에만 계산

Jekyll::Hooks.register :site, :post_write do |site|
  # 카테고리별 포스트 수 계산
  category_counts = {}
  
  site.posts.docs.each do |post|
    post.data['categories']&.each do |category|
      # 원본 카테고리 이름으로 카운트
      category_counts[category] = (category_counts[category] || 0) + 1
      
      # 소문자 + 하이픈 버전도 저장 (nav에서 매핑용)
      normalized_key = category.downcase.gsub(/\s+/, '-')
      category_counts[normalized_key] = (category_counts[normalized_key] || 0) + 1
    end
  end
  
  # 네비게이션 매핑을 위한 추가 매핑
  nav_mapping = {
    'logging' => category_counts['Logging'] || 0,
    'jenkins' => category_counts['Jenkins'] || 0,
    'django' => category_counts['Django'] || 0,
    'docker' => category_counts['Docker'] || 0,
    'react' => category_counts['React'] || 0,
    'clean-code' => category_counts['Clean Code'] || 0,
    'poetry' => category_counts['Poetry'] || 0,
    'pep' => category_counts['PEP'] || 0,
    'llm' => category_counts['LLM'] || 0,
    'review' => category_counts['Review'] || 0,
    'nginx' => category_counts['Nginx'] || 0,
    'safeline' => category_counts['SafeLine'] || 0,
    'github-actions' => category_counts['GitHub Actions'] || 0,
    'sentry' => category_counts['Sentry'] || 0,
    'aws' => category_counts['AWS'] || 0,
    'til' => category_counts['TIL'] || 0,
    'me' => category_counts['Me'] || 0,
    'chrome-extension' => category_counts['Chrome Extension'] || category_counts['Extention'] || 0
  }
  
  # 매핑된 카테고리 카운트 병합
  category_counts.merge!(nav_mapping)
  
  # _data/category_counts.yml 파일로 저장
  require 'yaml'
  
  data_dir = File.join(site.source, '_data')
  FileUtils.mkdir_p(data_dir) unless Dir.exist?(data_dir)
  
  File.open(File.join(data_dir, 'category_counts.yml'), 'w') do |file|
    file.write(category_counts.to_yaml)
  end
  
  puts "✅ 카테고리 카운트 생성 완료: #{category_counts.size}개 카테고리"
  
  # 네비게이션 매핑 결과만 표시
  puts "📊 네비게이션 카테고리 카운트:"
  nav_mapping.each do |key, count|
    puts "   #{key}: #{count}개" if count > 0
  end
end
