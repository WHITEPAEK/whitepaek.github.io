---
isDraft: false
title: 모음 제거
pubDate: 2025-05-16
---

## 문제 설명

영어에선 a, e, i, o, u 다섯 가지 알파벳을 모음으로 분류합니다. <br />
문자열 my_string이 매개변수로 주어질 때 모음을 제거한 문자열을 return 하도록 solution 함수를 완성해주세요.

- "bus"에서 모음 u를 제거한 "bs"를 return 합니다.
- "nice to meet you"에서 모음 i, o, e, u를 모두 제거한 "nc t mt y"를 return 합니다.

## 제한사항

- my_string은 소문자와 공백으로 이루어져 있습니다.
- 1 ≤ my_string의 길이 ≤ 1,000

## 솔루션 코드

#### Challenge Code
- 시간복잡도: O(5n)
```java
class Solution {
    public String solution(String my_string) {
        String[] vowel = {"a", "e", "i", "o", "u"};
        String answer = my_string;
        
        for (int i = 0; i < vowel.length; i++) {
            answer = answer.replaceAll(vowel[i], "");
        }
        
        return answer;
    }
}
```

#### Review Code
- 시간복잡도: O(n)
```java
class Solution {
    public String solution(String my_string) {
        return my_string.replaceAll("[aeiou]", "");
    }
}

```
