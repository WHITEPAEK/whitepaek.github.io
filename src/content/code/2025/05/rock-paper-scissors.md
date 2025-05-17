---
isDraft: false
title: 가위 바위 보
pubDate: 2025-05-16
---

## 문제 설명

가위는 2 바위는 0 보는 5로 표현합니다.
가위 바위 보를 내는 순서대로 나타낸 문자열 rsp가 매개변수로 주어질 때, rsp에 저장된 가위 바위 보를 모두 이기는 경우를 순서대로 나타낸 문자열을 return 하도록 solution 함수를 완성해보세요.

- "2"는 가위이므로 바위를 나타내는 "0"을 return 합니다.
- "205"는 순서대로 가위, 바위, 보이고 이를 모두 이기려면 바위, 보, 가위를 순서대로 내야하므로 “052”를 return 합니다.

## 제한사항

- 0 < rsp의 길이 ≤ 100
- rsp와 길이가 같은 문자열을 return 합니다.
- rsp는 숫자 0, 2, 5로 이루어져 있습니다.

## 솔루션 코드

#### Challenge Code
- 시간복잡도: O(n)
```java
class Solution {
    public String solution(String rsp) {
        StringBuilder sb = new StringBuilder();
        
        for (int i = 0; i < rsp.length(); i++) {
            char c = rsp.charAt(i);
            if (c == '2') {
                sb.append("0");
            } else if (c == '0') {
                sb.append("5");
            } else if (c == '5') {
                sb.append("2");
            }
        }
        
        return sb.toString();
    }
}
```

#### Review Code
- 시간복잡도: O(n)
```java
import java.util.*;

class Solution {
    public String solution(String rsp) {
        Map<Character, Character> winMap = Map.of(
            '2', '0',  // 가위 → 바위
            '0', '5',  // 바위 → 보
            '5', '2'   // 보 → 가위
        );

        StringBuilder sb = new StringBuilder();
        for (char c : rsp.toCharArray()) {
            sb.append(winMap.get(c));
        }

        return sb.toString();
    }
}
```
