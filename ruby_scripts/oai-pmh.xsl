<xsl:stylesheet version="1.0"
 xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
 <xsl:template match="/">
 	 <xsl:for-each select="object">
    <tr>
      <td><xsl:value-of select="id"/></td>
      <td><xsl:value-of select="lang"/></td>
    </tr>
    </xsl:for-each>
 <xsl:template />
</xsl:stylesheet>