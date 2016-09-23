Dim WshShell, strCurDir, strCurDir2
Set WshShell = CreateObject("WScript.Shell")
Const ForReading = 1
Const ForWriting = 2

strCurDir = WshShell.CurrentDirectory
strCurDir2 = Replace(strCurDir, "\", "/")

Set WshShell = CreateObject("WScript.Shell")
Set objFSO = CreateObject("Scripting.FileSystemObject")
Set objFile = objFSO.OpenTextFile(strCurDir &"\EPStoJPG.jsx", ForReading)

strText = objFile.ReadAll
objFile.Close

Dim re : Set re = New RegExp 
 re.Pattern = "Folder(\(.*\))" 
 re.IgnoreCase = True 
 strNewText = re.Replace(strText, "Folder(""""""" & strCurDir2 & """"""")")

Set objFile = objFSO.OpenTextFile(strCurDir &"\EPStoJPG.jsx", ForWriting)
objFile.WriteLine strNewText
objFile.Close