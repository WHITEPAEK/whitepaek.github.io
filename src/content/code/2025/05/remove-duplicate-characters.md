---
isDraft: false
title: 중복된 문자 제거
pubDate: 2025-05-17
---

## 문제 설명

문자열 my_string이 매개변수로 주어집니다. my_string에서 중복된 문자를 제거하고 하나의 문자만 남긴 문자열을 return 하도록 solution 함수를 완성해주세요.

- "people"에서 중복된 문자 "p"와 "e"을 제거한 "peol"을 return 합니다.
- "We are the world"에서 중복된 문자 "e", " ", "r" 들을 제거한 "We arthwold"을 return 합니다.

## 제한사항

- 1 ≤ my_string ≤ 110
- my_string은 대문자, 소문자, 공백으로 구성되어 있습니다.
- 대문자와 소문자를 구분합니다.
- 공백(" ")도 하나의 문자로 구분합니다.
- 중복된 문자 중 가장 앞에 있는 문자를 남깁니다.

## 솔루션 코드

#### Review Code
- 시간복잡도: O(n)
```java
import java.util.LinkedHashSet;
import java.util.Set;

class Solution {
    public String solution(String my_string) {
        Set<Character> unique = new LinkedHashSet<>();
        for (char c : my_string.toCharArray()) {
            unique.add(c);
        }

        StringBuilder sb = new StringBuilder();
        for (char c : unique) {
            sb.append(c);
        }

        return sb.toString();
    }
}
```

- 시간복잡도: O(n)
```java
import java.util.stream.Collectors;

class Solution {
    public String solution(String my_string) {
        return my_string.chars()
            .distinct()
            .mapToObj(c -> String.valueOf((char) c))
            .collect(Collectors.joining());
    }
}
```
